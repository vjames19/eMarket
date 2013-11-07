'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'product_id': 'id',
  'product_seller_id': 'sellerId',
  'seller_name': 'sellerName',
  'product_creation_date': 'creationDate',
  'product_spec_category_id': 'categoryId',
  'category_name': 'categoryName',
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
    var sql = 'SELECT products.* ' +
              'FROM products INNER JOIN active_users ' +
              'ON (product_seller_id = user_id) ' +
              'WHERE product_seller_id != ? ' +
              'ORDER BY RAND() ' +
              'LIMIT 10';
    connection.query(sql, [userId], function(err, products) {
      if(err) {
        callback(err);
      } else {
        products = _.map(products, function(product) {
          return mapper.map(product, DICTIONARY);
        });
        callback(null, products);
      }
    });
  });
};

module.exports.get = function(userId, carouselId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT products.* ' +
              'FROM products INNER JOIN active_users ' +
              'ON (product_seller_id = user_id) ' +
              'WHERE product_seller_id != ? AND product_id = ? ' +
              'ORDER BY RAND() ' +
              'LIMIT 10';
    connection.query(sql, [userId, carouselId], function(err, product) {
      callback(err, mapper.map(product[0], DICTIONARY));
    });
  });
};
