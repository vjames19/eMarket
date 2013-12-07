'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');
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
        logger.logQuery('products_getAll:', this.sql);
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
        logger.logQuery('products_get:', this.sql);
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
          'WHERE category_id = ? ' +
          'OR product_spec_name LIKE ? ' +
          'OR product_spec_brand LIKE ? ' +
          'OR product_spec_model LIKE ?';
      var categoryId = query;
      query = '%' + query + '%';
      connection.query(sql, [categoryId, query, query, query], function(err, products) {
        logger.logQuery('products_search:', this.sql);
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
            logger.logQuery('products_searchByCategory:', this.sql);
            callback(err, mapper.mapCollection(products, DICTIONARY));
          });
        }
      });
    }
  });
};

module.exports.create = function(product, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'INSERT INTO product_specification ' +
          '(product_spec_category_id, product_spec_name, product_spec_nonbid_price, ' +
          'product_spec_starting_bid_price, product_spec_bid_end_date, product_spec_shipping_price, ' +
          'product_spec_quantity, product_spec_description, product_spec_condition, product_spec_picture, ' +
          'product_spec_brand, product_spec_model, product_spec_dimensions, product_spec_is_draft) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      var params1 = [
        product.categoryId, product.productName, product.nonbidPrice,
        product.startingBidPrice, product.bidEndDate, product.shippingPrice,
        product.quantity - 1, product.description, product.condition, product.picture,
        product.brand, product.model, product.dimensions, false
      ];
      var sql2 = 'INSERT INTO product_quantity_record ' +
          '(product_quantity_spec_id, product_quantity_remaining) ' +
          'VALUES (?, ?)';
      var sql3 = 'INSERT INTO product_info ' +
          '(product_seller_id, product_info_spec_id, product_creation_date, product_depletion_date) ' +
          'VALUES (?, ?, CURRENT_TIMESTAMP, NULL)';
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, params1, function(err, insertStatus) {
            logger.logQuery('products_create:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              var specId = insertStatus.insertId;
              var params2 = [specId, product.quantity - 1];
              connection.query(sql2, params2, function(err) {
                logger.logQuery('products_create:', this.sql);
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                } else {
                  var params3 = [userId, specId];
                  connection.query(sql3, params3, function(err) {
                    logger.logQuery('products_create:', this.sql);
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
                          callback(null, product);
                          console.log('Product Created Successfully.');
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
  });
};
