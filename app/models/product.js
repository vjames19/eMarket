'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var Category = require('./category.js');

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

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT * FROM products';
      connection.query(sql, function(err, products) {
        callback(err, mapper.mapCollection(products, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(id, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT * FROM products ' +
          'WHERE product_id = ?';
      connection.query(sql, [id], function(err, products) {
        callback(err, mapper.map(products[0], DICTIONARY));
      });
    }
  });
};

module.exports.search = function(query, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT * FROM products ' +
          'WHERE category_id=? ' +
          'OR product_spec_name LIKE ? ' +
          'OR product_spec_brand LIKE ? ' +
          'OR product_spec_model LIKE ?';
      var categoryId = query;
      query = '%' + query + '%';
      connection.query(sql, [categoryId, query, query, query], function(err, products) {
        console.log('model search', categoryId, query, arguments);
        callback(err, mapper.mapCollection(products, DICTIONARY));
      });
    }
  });
};

module.exports.searchByCategory = function(parentCategoryId, callback) {
  Category.getAllSubTreeIds(parentCategoryId, function(err, categoryIds) {
    if(err) {
      callback(err);
    } else {
      executor.execute(function(err, connection) {
        if(err) {
          callback(err);
        } else {
          categoryIds.push(parentCategoryId);
          var sql = 'SELECT * FROM products ' +
              'WHERE category_id IN (?)';
          connection.query(sql, [categoryIds], function(err, products) {
            callback(err, mapper.mapCollection(products, DICTIONARY));
          });
        }
      });
    }
  });
};
