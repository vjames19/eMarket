'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'product_id': 'id',
  'product_seller_id': 'sellerId',
  'product_creation_date': 'creationDate',
  'product_spec_category_id': 'categoryId',
  'product_spec_name': 'name',
  'product_spec_nonbid_price': 'nonbidPrice',
  'product_spec_starting_bid_price': 'startingBidPrice',
  'product_spec_bid_end_date': 'bidEndDate',
  'product_spec_shipping_price': 'shippingPrice',
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


