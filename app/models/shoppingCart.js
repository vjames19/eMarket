'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'cart_id': 'id',
  'product_spec_name': 'productName',
  'product_total_price': 'productTotalPrice',
  'product_spec_shipping_price': 'shippingPrice',
  'cart_item_quantity': 'itemQuantity'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT cart_id, product_spec_name, product_spec_nonbid_price * cart_item_quantity AS product_total_price, ' +
              'product_spec_shipping_price, cart_item_quantity ' +
              'FROM cart_history INNER JOIN cart_item_history INNER JOIN product_specification ' +
              'ON (cart_history.cart_id = cart_item_history.cart_item_cart_id AND cart_item_product_id = product_spec_id) ' +
              'WHERE cart_user_id = ?';
    connection.query(sql, [userId], function(err, shoppingCarts) {
      if(err) {
        callback(err);
      } else {
        shoppingCarts = _.map(shoppingCarts, function(shoppingCart) {
          return mapper.map(shoppingCart, DICTIONARY);
        });
        callback(null, shoppingCarts);
      }
    });
  });
};

module.exports.get = function(userId, cartId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT cart_id, product_spec_name, product_spec_nonbid_price * cart_item_quantity AS product_price, ' +
              'product_spec_shipping_price, cart_item_quantity ' +
              'FROM cart_history INNER JOIN cart_item_history INNER JOIN product_specification ' +
              'ON (cart_history.cart_id = cart_item_history.cart_item_cart_id AND cart_item_product_id = product_spec_id) ' +
              'WHERE cart_user_id = ? AND cart_id = cartId';
    connection.query(sql, [userId, cartId], function(err, shoppingCart) {
      callback(err, mapper.map(shoppingCart[0], DICTIONARY));
    });
  });
};

