'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

var DICTIONARY = {
  'cart_id': 'id',
  'cart_item_id': 'itemId',
  'cart_item_cart_id': 'cartItemCartId',
  'cart_item_quantity': 'itemQuantity',
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
  'product_spec_description': 'description',
  'product_spec_condition': 'condition',
  'product_spec_picture': 'picture',
  'product_spec_brand': 'brand',
  'product_spec_model': 'model',
  'product_spec_dimensions': 'dimensions'
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
      var sql = 'SELECT cart_item_id, cart_item_cart_id, cart_item_quantity, ' +
          'product_spec_nonbid_price * cart_item_quantity AS product_total_price, products.* ' +
          'FROM cart_history INNER JOIN cart_item_history INNER JOIN products ' +
          'ON (cart_id = cart_item_cart_id AND cart_item_product_id = product_id) ' +
          'WHERE cart_user_id = ? AND cart_item_closed_date IS NULL';
      connection.query(sql, [userId], function(err, shoppingCarts) {
        logger.logQuery('cart_getAll:', this.sql);
        callback(err, mapper.mapCollection(shoppingCarts, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, cartItemId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT cart_item_id, cart_item_cart_id, cart_item_quantity, ' +
          'product_spec_nonbid_price * cart_item_quantity AS product_total_price, products.* ' +
          'FROM cart_history INNER JOIN cart_item_history INNER JOIN products ' +
          'ON (cart_id = cart_item_cart_id AND cart_item_product_id = product_id) ' +
          'WHERE cart_user_id = ? AND cart_item_id = ? AND cart_item_closed_date IS NULL';
      connection.query(sql, [userId, cartItemId], function(err, shoppingCart) {
        logger.logQuery('cart_get:', this.sql);
        callback(err, mapper.map(shoppingCart[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(cartItem, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'SELECT cart_id ' +
          'FROM cart_history ' +
          'WHERE cart_user_id = ? AND cart_closed_date IS NULL';
      var sql2 = 'INSERT INTO cart_item_history ' +
          '(cart_item_cart_id, cart_item_product_id, cart_item_quantity, cart_item_is_bid_item) ' +
          'VALUES (?, ?, ?, ?)';
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, [userId], function(err, cartIdToBeAdded) {
            logger.logQuery('cart_create:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              var cartId = mapper.map(cartIdToBeAdded[0], DICTIONARY);
              if(cartItem.amountToBuy <= 0 && cartItem.amountToBuy > cartItem.quantity) {
                connection.commit(function(err) {
                  if(err) {
                    connection.rollback(function(err) {
                      callback(err);
                    });
                  } else {
                    callback(null, null);
                    console.log('Cannot Add Product Successfully.');
                  }
                });
              } else {
                var params2 = [cartId.id, cartItem.id, cartItem.amountToBuy, cartItem.isBidItem];
                connection.query(sql2, params2, function(err) {
                  logger.logQuery('cart_create:', this.sql);
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
                        callback(null, cartItem);
                        console.log('Product Added to Cart Successfully');
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
};

module.exports.remove = function(cartItem, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'UPDATE cart_item_history ' +
          'SET cart_item_closed_date = NOW() ' +
          'WHERE cart_item_id = ?';
      connection.query(sql, [cartItem.itemId], function(err) {
        logger.logQuery('cart_remove:', this.sql);
        callback(err, cartItem);
      });
    }
  });
};



