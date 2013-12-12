'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');
var async = require('async');

var CART_DICT = {
  'cart_id': 'cartId'
};

var CART_ITEM_DICT = {
  'cart_item_id': 'itemId',
  'cart_item_cart_id': 'cartId',
  'cart_item_product_id': 'productId',
  'cart_item_quantity': 'quantity',
  'cart_item_is_bid_item': 'isBidItem'
};

var REMAINING_DICT = {
  'product_quantity_remaining': 'remainingQuantity'
};

var CALCULATE_ITEMS_DICT = {
  'cart_item_quantity': 'cartQuantity',
  'product_total_nonbid_price': 'nonBidPrice',
  'product_total_bid_price': 'bidPrice',
  'cart_item_is_bid_item': 'isBidItem',
  'product_id': 'productId',
  'product_seller_id': 'sellerId',
  'product_spec_id': 'specId',
  'product_spec_quantity': 'totalQuantity',
  'product_quantity_remaining': 'remainingQuantity',
  'product_spec_shipping_price': 'shippingPrice',
  'product_spec_name': 'productName'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.create = function(checkoutInfo, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {

      userId = +userId;
      var getUserCart = 'SELECT cart_id ' +
          'FROM cart_history ' +
          'WHERE cart_user_id = ? AND cart_closed_date IS NULL';
      var getCartItems = 'SELECT * FROM cart_item_history ' +
          'WHERE cart_item_cart_id = ? AND cart_item_closed_date IS NULL AND cart_item_purchased_date IS NULL';
      var getRemainingQuantity = 'SELECT product_quantity_remaining FROM products ' +
          'WHERE product_depletion_date IS NULL AND product_id = ?'; // Run for each cart item.

      var removeCartItemsPartial = 'UPDATE cart_item_history SET cart_item_closed_date = NOW() ' +
          'WHERE cart_item_product_id = ? AND cart_item_cart_id = ?'; // Execute if validation failed, end transact.

      var removeCart = 'UPDATE cart_history SET cart_closed_date = NOW() ' +
          'WHERE cart_user_id = ?';
      var removeCartItemsFull = 'UPDATE cart_item_history SET cart_item_closed_date = NOW(), ' +
          'cart_item_purchased_date = NOW() WHERE cart_item_cart_id = ? AND cart_item_closed_date IS NULL';
      var insertNewCart = 'INSERT INTO cart_history ' +
          '(cart_user_id, cart_closed_date) ' +
          'VALUES (?, NULL)';
      // Loop
      var calculatePricesPerItem = 'SELECT cart_item_id, cart_item_cart_id, cart_item_quantity, ' +
          'product_spec_nonbid_price * cart_item_quantity AS product_total_nonbid_price, ' +
          'current_bid * cart_item_quantity AS product_total_bid_price, ' +
          'cart_item_is_bid_item, non_draft_all_Products.* ' +
          'FROM cart_history INNER JOIN cart_item_history INNER JOIN non_draft_all_Products ' +
          'ON (cart_id = cart_item_cart_id AND cart_item_product_id = product_id) ' +
          'WHERE cart_user_id = ? AND cart_item_id = ? AND cart_item_closed_date IS NULL';
      var updateQuantity = 'UPDATE product_quantity_record ' +
          'SET product_quantity_remaining =  ? ' +
          'WHERE product_quantity_spec_id = ?';
      var insertProductTransaction = 'INSERT INTO product_transaction_history ' +
          '(product_transaction_product_id, product_transaction_quantity, product_transaction_date) ' +
          'VALUES (?, ?, CURRENT_TIMESTAMP)';
      var insertPaymentHistory = 'INSERT INTO payment_history ' +
          '(payment_sender_user_id, payment_recipient_user_id, payment_amount, payment_method, ' +
          'payment_card_id, payment_bank_id, payment_transaction_time, payment_is_finished) ' +
          'VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, FALSE)';
      var insertInvoiceHistory = 'INSERT INTO invoice_history ' +
          '(invoice_user_id, invoice_bank_id, invoice_card_id, invoice_mail_id, invoice_creation_date) ' +
          'VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)';
      var insertInvoiceItemHistory = 'INSERT INTO invoice_item_history ' +
          '(invoice_item_invoice_id, invoice_item_product_id, invoice_item_quantity, invoice_item_sold_price) ' +
          'VALUES (?, ?, ?, ?)';
      var notifyUser = 'INSERT INTO notification_history ' +
          '(notification_user_id, notification_message, notification_is_read) ' +
          'VALUES(?, ?, FALSE)';
      var notifySeller = 'INSERT INTO notification_history ' +
          '(notification_user_id, notification_message, notification_is_read) ' +
          'VALUES(?, ?, FALSE)';
      // Product Depleted
      var depleteItem = 'UPDATE product_info ' +
          'SET product_depletion_date = CURRENT_TIMESTAMP ' +
          'WHERE product_info_spec_id = ?';
      var closeProductBids = 'UPDATE bid_history ' +
          'SET bid_closed_date = CURRENT_TIMESTAMP ' +
          'WHERE bid_product_id = ?';

      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(getUserCart, [userId], function(err, userCart) {
            logger.logQuery('pay_create:', this.sql);
            if(err) {
              callback(err);
            } else {
              userCart = mapper.map(userCart[0], CART_DICT);
              connection.query(getCartItems, [userCart.cartId], function(err, cartItems) {
                logger.logQuery('pay_create:', this.sql);
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                } else {
                  cartItems = mapper.mapCollection(cartItems, CART_ITEM_DICT);

                  var hasError = false;
                  async.forEachSeries(cartItems, function(cartItem, finishedFirst) {

                    connection.query(getRemainingQuantity, [cartItem.productId], function(err, quantity) {
                      logger.logQuery('pay_create:', this.sql);
                      if(err) {
                        connection.rollback(function() {
                          finishedFirst(err);
                        });
                      } else {
                        quantity = mapper.map(quantity[0], REMAINING_DICT);
                        if(cartItem.quantity <= quantity.remainingQuantity || cartItem.isBidItem) {
                          finishedFirst(null);
                        } else {
                          hasError = true;
                          var partialParams = [cartItem.productId, userCart.cartId];
                          connection.query(removeCartItemsPartial, partialParams, function(err) {
                            logger.logQuery('pay_create:', this.sql);
                            if(err) {
                              connection.rollback(function() {
                                finishedFirst(err);
                              });
                            }
                          });
                          finishedFirst(null);
                        }
                      }
                    });

                  }, function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    } else if(hasError) {
                      connection.commit(function(err) {
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        } else {
                          callback(err, null);
                        }
                      });
                    } else {

                      console.log('passed all iterators');
                      var par = null;
                      if(checkoutInfo.selectedBank) {
                        par = [userId, checkoutInfo.selectedBank,
                          null, checkoutInfo.selectedAddress];
                      } else {
                        par = [userId, null,
                          checkoutInfo.selectedCard, checkoutInfo.selectedAddress];
                      }

                      connection.query(insertInvoiceHistory, par, function(err, invoice) {
                        logger.logQuery('pay_create:', this.sql);
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        } else {
                          var invoiceId = null;
                          if(invoice.insertId) {
                            invoiceId = invoice.insertId;
                          }

                          async.forEachSeries(cartItems, function(cartItem, finishedSecond) {

                            var pricesParams = [userId, cartItem.itemId];
                            connection.query(calculatePricesPerItem, pricesParams, function(err, prices) {
                              logger.logQuery('pay_create:', this.sql);
                              if(err) {
                                connection.rollback(function() {
                                  finishedSecond(err);
                                });
                              } else {
                                prices = mapper.map(prices[0], CALCULATE_ITEMS_DICT);
                                var newQuantity = prices.remainingQuantity - prices.cartQuantity;
                                if(cartItem.isBidItem){
                                  newQuantity = prices.remainingQuantity;
                                }
                                connection.query(updateQuantity, [newQuantity, prices.specId], function(err) {
                                  logger.logQuery('pay_create:', this.sql);
                                  if(err) {
                                    connection.rollback(function() {
                                      finishedSecond(err);
                                    });
                                  } else {
                                    var prodTransParams = [prices.productId, prices.cartQuantity];
                                    connection.query(insertProductTransaction, prodTransParams, function(err) {
                                      logger.logQuery('pay_create:', this.sql);
                                      if(err) {
                                        connection.rollback(function() {
                                          finishedSecond(err);
                                        });
                                      } else {

                                        var paymentAmount = null;
                                        if(prices.isBidItem) {
                                          paymentAmount = prices.bidPrice + prices.shippingPrice;
                                        } else {
                                          paymentAmount = prices.nonBidPrice + prices.shippingPrice;
                                        }
                                        var payParams = null;
                                        if(checkoutInfo.selectedBank) {
                                          payParams = [userId, prices.sellerId, paymentAmount,
                                            checkoutInfo.paymentMethod, null, checkoutInfo.selectedBank];
                                        } else {
                                          payParams = [userId, prices.sellerId, paymentAmount,
                                            checkoutInfo.paymentMethod, checkoutInfo.selectedCard, null];
                                        }
                                        connection.query(insertPaymentHistory, payParams, function(err) {
                                          logger.logQuery('pay_create:', this.sql);
                                          if(err) {
                                            connection.rollback(function() {
                                              finishedSecond(err);
                                            });
                                          } else {
                                            var par2 = [invoiceId, prices.productId,
                                              prices.cartQuantity, paymentAmount];
                                            connection.query(insertInvoiceItemHistory, par2, function(err) {
                                              logger.logQuery('pay_create:', this.sql);
                                              if(err) {
                                                connection.rollback(function() {
                                                  finishedSecond(err);
                                                });
                                              } else {
                                                var uMsg = 'You have bought ' + prices.productName + '.';
                                                var sMsg = 'You have sold ' + prices.productName + '.';
                                                var uMsgP = [userId, uMsg];
                                                var sMsgP = [prices.sellerId, sMsg];
                                                connection.query(notifyUser, uMsgP, function(err) {
                                                  logger.logQuery('pay_create:', this.sql);
                                                  if(err) {
                                                    connection.rollback(function() {
                                                      finishedSecond(err);
                                                    });
                                                  } else {
                                                    connection.query(notifySeller, sMsgP, function(err) {
                                                      logger.logQuery('pay_create:', this.sql);
                                                      if(err) {
                                                        connection.rollback(function() {
                                                          finishedSecond(err);
                                                        });
                                                      } else {
                                                        if(newQuantity > 0 || cartItem.isBidItem) {
                                                          finishedSecond(null);
                                                        }
                                                        else {
                                                          var q1 = depleteItem;
                                                          var q1P = [prices.specId];
                                                          var q2 = closeProductBids;
                                                          var q2P = [prices.productId];
                                                          connection.query(q1, q1P, function(err) {
                                                            logger.logQuery('pay_create:', this.sql);
                                                            if(err) {
                                                              connection.rollback(function() {
                                                                finishedSecond(err);
                                                              });
                                                            } else {
                                                              connection.query(q2, q2P, function(err) {
                                                                logger.logQuery('pay_create:', this.sql);
                                                                if(err) {
                                                                  connection.rollback(function() {
                                                                    finishedSecond(err);
                                                                  });
                                                                } else {
                                                                  finishedSecond(null);
                                                                }
                                                              });
                                                            }
                                                          });
                                                        }
                                                      }
                                                    });
                                                  }
                                                });
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }

                            });

                          }, function(err) {

                            if(err) {
                              callback(err);
                            } else {

                              connection.query(removeCart, [userId], function(err) {
                                logger.logQuery('pay_create:', this.sql);
                                if(err) {
                                  connection.rollback(function() {
                                    callback(err);
                                  });
                                } else {
                                  connection.query(removeCartItemsFull, [userCart.cartId], function(err) {
                                    logger.logQuery('pay_create:', this.sql);
                                    if(err) {
                                      connection.rollback(function() {
                                        callback(err);
                                      });
                                    } else {
                                      connection.query(insertNewCart, [userId], function(err) {
                                        logger.logQuery('pay_create:', this.sql);
                                        if(err) {
                                          connection.rollback(function() {
                                            callback(err);
                                          });
                                        } else {
                                          connection.commit(function(err) {
                                            if(err) {
                                              connection.rollback(function() {
                                                callback(err);
                                              });
                                            } else {
                                              callback(null, checkoutInfo);
                                              console.log('Payment is Successful.');
                                            }
                                          });
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }

                          });

                        }
                      });

                    }
                  });

                }
              });
            }
          });
        }
      });

    }
  });
};
