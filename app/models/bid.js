'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');
var _ = require('underscore');

var DICTIONARY = {
  'bid_id': 'id',
  'bid_user_id': 'userId',
  'bid_product_id': 'productId',
  'bid_amount': 'bidAmount',
  'bid_creation_date': 'creationDate',
  'bid_closed_date': 'closedDate',
  'highest_bid': 'highestBid',
  'product_seller_id': 'sellerId',
  'seller_name': 'sellerName',
  'product_creation_date': 'creationDate',
  'product_spec_category_id': 'categoryId',
  'category_name': 'categoryName',
  'product_spec_name': 'productName',
  'product_spec_nonbid_price': 'nonbidPrice',
  'product_spec_starting_bid_price': 'startingBidPrice',
  'current_bid': 'currentBid',
  'product_spec_bid_end_date': 'bidEndDate',
  'product_spec_shipping_price': 'shippingPrice',
  'product_total_price': 'productTotalPrice',
  'product_spec_quantity': 'quantity',
  'product_quantity_remaining': 'quantityRemaining',
  'product_spec_description': 'description',
  'product_spec_condition': 'condition',
  'product_spec_picture': 'picture',
  'product_spec_brand': 'brand',
  'product_spec_model': 'model',
  'product_spec_dimensions': 'dimensions',
  'cart_id': 'cartId'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT bid_history.*, MAX(bid_amount) AS highest_bid, products.* ' +
          'FROM bid_history INNER JOIN active_users INNER JOIN products ' +
          'ON (bid_user_id = user_id AND bid_product_id = product_id) ' +
          'WHERE user_id = ? AND bid_closed_date IS NULL ' +
          'GROUP BY bid_product_id ' +
          'ORDER BY bid_creation_date DESC';
      connection.query(sql, [userId], function(err, bids) {
        logger.logQuery('bid_getAll:', this.sql);
        callback(err, mapper.mapCollection(bids, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, bidId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT bid_history.*, MAX(bid_amount) AS highest_bid, products.* ' +
          'FROM bid_history INNER JOIN active_users INNER JOIN products ' +
          'ON (bid_user_id = user_id AND bid_product_id = product_id) ' +
          'WHERE user_id = ? AND bid_id = ? AND bid_closed_date IS NULL ' +
          'GROUP BY bid_product_id ' +
          'ORDER BY bid_creation_date DESC';
      connection.query(sql, [userId, bidId], function(err, bids) {
        logger.logQuery('bid_get:', this.sql);
        callback(err, mapper.map(bids[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(itemBid, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'SELECT current_bid, product_quantity_remaining ' +
          'FROM products ' +
          'WHERE product_id = ? AND product_depletion_date IS NULL AND product_spec_bid_end_date > CURRENT_TIMESTAMP';
      var sql2 = 'INSERT INTO bid_history ' +
          '(bid_user_id, bid_product_id, bid_amount, bid_closed_date) ' +
          'VALUES (?, ?, ?, ?)';
      var sql3 = 'UPDATE product_quantity_record ' +
          'SET product_quantity_remaining = ? ' +
          'WHERE product_quantity_spec_id = ?';
      var sql4 = 'SELECT cart_id ' +
          'FROM cart_history ' +
          'WHERE cart_user_id = ? AND cart_closed_date IS NULL';
      var sql5 = 'INSERT INTO cart_item_history ' +
          '(cart_item_cart_id, cart_item_product_id, cart_item_quantity, cart_item_is_bid_item) ' +
          'VALUES (?, ?, ?, ?)';
      var sql6 = 'INSERT INTO notification_history ' +
          '(notification_user_id, notification_message, notification_is_read) ' +
          'VALUES(?, ?, ?)';
      var sql7 = 'UPDATE product_info ' +
          'SET product_depletion_date = CURRENT_TIMESTAMP ' +
          'WHERE product_info_spec_id = ?';
      var MAX_BID_VALUE = 99999999999.99;
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, itemBid.id, function(err, productToBeUsed) {
            logger.logQuery('bid_create:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              if(_.isEmpty(productToBeUsed)) {
                connection.commit(function(err) {
                  if(err) {
                    connection.rollback(function(err) {
                      callback(err);
                    });
                  } else {
                    callback(null, null);
                    console.log('Bidding Probably Has Ended. Cannot Place Bid Successfully.');
                  }
                });
              }
              else {
                var product = mapper.map(productToBeUsed[0], DICTIONARY);
                if(product.quantityRemaining < 1) {
                  connection.commit(function(err) {
                    if(err) {
                      connection.rollback(function(err) {
                        callback(err);
                      });
                    } else {
                      callback(null, null);
                      console.log('There is no more products available. Cannot Place Bid Successfully.');
                    }
                  });
                }
                else {
                  // Validate Data
                  var isBidValid = false;
                  var isBidMax = false;
                  console.log('bidAm', itemBid.bidAmount);
                  console.log('max', MAX_BID_VALUE);
                  if(+itemBid.bidAmount >= MAX_BID_VALUE) {
                    itemBid.bidAmount = MAX_BID_VALUE;
                    isBidMax = true;
                  } else {
                    if(!product.currentBid) {
                      isBidValid = itemBid.startingBidPrice + 5 <= itemBid.bidAmount;
                    }
                    else {
                      isBidValid = product.currentBid + 5 <= itemBid.bidAmount;
                    }
                    isBidMax = false;
                  }
                  // Execute Corresponding queries
                  if(isBidMax) {
                    connection.query(sql3, [product.quantityRemaining - 1, itemBid.id], function(err) {
                      logger.logQuery('bic_create:', this.sql);
                      if(err) {
                        connection.rollback(function(err) {
                          callback(err);
                        });
                      } else {
                        // Close bid_history for this product
                        var params2 = [userId, itemBid.id, itemBid.bidAmount, new Date()];
                        connection.query(sql2, params2, function(err) {
                          logger.logQuery('bid_create:', this.sql);
                          if(err) {
                            connection.rollback(function() {
                              callback(err);
                            });
                          } else {
                            connection.query(sql4, [userId], function(err, cartIdToBeAdded) {
                              logger.logQuery('bid_create:', this.sql);
                              if(err) {
                                connection.rollback(function() {
                                  callback(err);
                                });
                              } else {
                                var cart = mapper.map(cartIdToBeAdded[0], DICTIONARY);
                                var params5 = [cart.cartId, itemBid.id, 1, itemBid.isBidItem];
                                connection.query(sql5, params5, function(err) {
                                  logger.logQuery('bid_create:', this.sql);
                                  if(err) {
                                    connection.rollback(function() {
                                      callback(err);
                                    });
                                  } else {
                                    var msg = 'You have won the bid for product ' + itemBid.productName;
                                    var params6 = [userId, msg, 0];
                                    connection.query(sql6, params6, function(err) {
                                      logger.logQuery('bid_create:', this.sql);
                                      if(err) {
                                        connection.rollback(function() {
                                          callback(err);
                                        });
                                      } else {
                                        if(product.quantityRemaining - 1 === 0) {
                                          connection.query(sql7, [itemBid.id], function(err) {
                                            logger.logQuery('bid_create:', this.sql);
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
                                                  callback(null, itemBid);
                                                  console.log('Bid Added Successfully. Product Depleted.');
                                                }
                                              });
                                            }
                                          });
                                        }
                                        else {
                                          connection.commit(function(err) {
                                            if(err) {
                                              connection.rollback(function() {
                                                callback(err);
                                              });
                                            } else {
                                              callback(null, itemBid);
                                              console.log('Bid Added Successfully.');
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
                  else {
                    if(!isBidValid) {
                      connection.commit(function(err) {
                        if(err) {
                          connection.rollback(function(err) {
                            callback(err);
                          });
                        } else {
                          callback(null, null);
                          console.log('Need to place a higher bid. Cannot Place Bid Successfully.');
                        }
                      });
                    } else {
                      var params2 = [userId, itemBid.id, itemBid.bidAmount, null];
                      connection.query(sql2, params2, function(err) {
                        logger.logQuery('bid_create:', this.sql);
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
                              callback(null, itemBid);
                              console.log('Bid Added successful.');
                            }
                          });
                        }
                      });
                    }
                  }
                }
              }
            }
          });
        }
      });
    }
  });
};

