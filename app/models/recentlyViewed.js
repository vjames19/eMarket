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
    var sql = 'SELECT product_info.*, product_specification.* ' +
        'FROM recently_viewed_items INNER JOIN user_info INNER JOIN product_info INNER JOIN product_specification ' +
        'ON (user_id=recently_viewed_user_id AND product_id=recently_viewed_product_id ' +
        'AND product_info_spec_id=product_spec_id) ' +
        'WHERE user_id=? AND product_spec_is_draft=0 ' +
        'ORDER BY recently_viewed_date DESC ' +
        'LIMIT 0, 10';
    connection.query(sql, [userId], function(err, products) {
      callback(err, mapper.map(products[0], DICTIONARY));
    });
  });
};

module.exports.get = function(userId, recentlyViewedId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT product_info.*, product_specification.* ' +
        'FROM recently_viewed_items INNER JOIN user_info INNER JOIN product_info INNER JOIN product_specification ' +
        'ON (user_id=recently_viewed_user_id AND product_id=recently_viewed_product_id ' +
        'AND product_info_spec_id=product_spec_id) ' +
        'WHERE user_id=? AND recently_viewed_id=? AND product_spec_is_draft=0 ' +
        'ORDER BY recently_viewed_date DESC ' +
        'LIMIT 0, 10';
    connection.query(sql, [userId, recentlyViewedId], function(err, products) {
      callback(err, mapper.map(products[0], DICTIONARY));
    });
  });
};
