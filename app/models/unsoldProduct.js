'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'product_id': 'id',
  'product_creation_date': 'creationDate',
  'product_spec_category_id': 'categoryId',
  'category_name': 'categoryName',
  'product_spec_name': 'productName',
  'product_spec_nonbid_price': 'nonbidPrice',
  'product_spec_starting_bid_price': 'startingBidPrice',
  'current_bid': 'currentBid',
  'product_spec_bid_end_date': 'bidEndDate',
  'product_spec_shipping_price': 'shippingPrice',
  'product_spec_quantity': 'quantity',
  'product_spec_description': 'description',
  'product_spec_condition': 'condition',
  'product_spec_picture': 'picture',
  'product_spec_brand': 'brand',
  'product_spec_model': 'model',
  'product_spec_dimensions': 'dimensions',
  'product_quantity_remaining': 'quantityRemaining',
  'product_seller_id': 'sellerId',
  'seller_name': 'sellerName'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT products.* ' +
        'FROM products ' +
        'WHERE product_seller_id = ? AND ' +
        'product_quantity_remaining > 0 AND ' +
        'product_depletion_date IS NULL';
    connection.query(sql, [userId], function(err, unsoldProducts) {
      if(err) {
        callback(err);
      } else {
        callback(null, mapper.mapCollection(unsoldProducts, DICTIONARY));
      }
    });
  });
};

module.exports.get = function(userId, unsoldProductId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT products.* ' +
        'FROM products ' +
        'WHERE product_seller_id = ? AND ' +
        'product_quantity_remaining > 0 AND ' +
        'product_depletion_date IS NULL AND ' +
        'product_id = ?';
    connection.query(sql, [userId, unsoldProductId], function(err, unsoldProduct) {
      callback(err, mapper.map(unsoldProduct[0], DICTIONARY));
    });
  });
};


