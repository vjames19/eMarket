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
  'product_quantity_remaining': 'quantityRemaining'
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
      // TODO (vjames19): fix distinct and use subquery
      var sql = 'SELECT DISTINCT products.* ' +
          'FROM recently_viewed_items INNER JOIN user_info INNER JOIN products ' +
          'ON (user_id = recently_viewed_user_id AND product_id = recently_viewed_product_id) ' +
          'WHERE user_id = ? ' +
          'ORDER BY recently_viewed_date DESC ' +
          'LIMIT 0, 10';
      connection.query(sql, [userId], function(err, products) {
        logger.logQuery('recentlyViewed_getAll:', this.sql);
        callback(err, mapper.mapCollection(products, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, recentlyViewedId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT products.* ' +
          'FROM recently_viewed_items INNER JOIN user_info INNER JOIN products ' +
          'ON (user_id = recently_viewed_user_id AND product_id = recently_viewed_product_id) ' +
          'WHERE user_id = ? AND recently_viewed_id = ?' +
          'ORDER BY recently_viewed_date DESC ' +
          'LIMIT 0, 10';
      connection.query(sql, [userId, recentlyViewedId], function(err, product) {
        logger.logQuery('recentlyViewed_get:', this.sql);
        callback(err, mapper.map(product[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(userId, recentlyViewed, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'INSERT INTO recently_viewed_items (recently_viewed_user_id, recently_viewed_product_id) ' +
          'VALUES (?,?)';
      connection.query(sql, [userId, recentlyViewed.productId], function(err, insertStatus) {
        logger.logQuery('recentlyViewed_create:', this.sql);
        callback(err, insertStatus);
      });
    }
  });
};
