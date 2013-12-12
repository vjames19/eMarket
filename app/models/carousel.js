'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

var DICTIONARY = {
  'product_id': 'id',
  'product_seller_id': 'sellerId',
  'seller_name': 'sellerName',
  'product_creation_date': 'creationDate',
  'product_spec_category_id': 'categoryId',
  'category_name': 'categoryName',
  'product_spec_id': 'specId',
  'product_spec_name': 'productName',
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
  'product_spec_dimensions': 'dimensions',
  'product_quantity_remaining': 'quantityRemaining',
  'current_bid': 'currentBid'
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
      var sql = 'SELECT products.* ' +
          'FROM products INNER JOIN active_users ' +
          'ON (product_seller_id = user_id) ' +
          'WHERE product_seller_id != ? ' +
          'ORDER BY RAND() ' +
          'LIMIT 10';
      connection.query(sql, [userId], function(err, products) {
        logger.logQuery('carousel_getAll:', this.sql);
        callback(err, mapper.mapCollection(products, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, carouselId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT products.* ' +
          'FROM products INNER JOIN active_users ' +
          'ON (product_seller_id = user_id) ' +
          'WHERE product_seller_id != ? AND product_id = ? ' +
          'ORDER BY RAND() ' +
          'LIMIT 10';
      connection.query(sql, [userId, carouselId], function(err, product) {
        logger.logQuery('carousel_get:', this.sql);
        callback(err, mapper.map(product[0], DICTIONARY));
      });
    }
  });
};
