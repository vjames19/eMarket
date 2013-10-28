'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'product_id': 'id',
  'product_creation_date': 'creationDate',
  'product_spec_category_id': 'categoryId',
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
              'FROM product_info INNER JOIN product_specification ' +
              'ON (product_info_spec_id = product_spec_id) ' +
              'WHERE product_seller_id = ? AND product_spec_is_draft = 0 AND product_id NOT IN (' +
              'SELECT product_id ' +
              'FROM invoice_history INNER JOIN invoice_item_history INNER JOIN user_login_info ' +
              'INNER JOIN product_info INNER JOIN product_specification ' +
              'ON (invoice_id = invoice_item_invoice_id AND invoice_user_id = user_login_id ' +
              'AND invoice_item_product_id = product_id AND product_info_spec_id = product_spec_id) ' +
              'WHERE product_seller_id = ?)';
    connection.query(sql, [userId, userId], function(err, unsoldProducts) {
      if(err) {
        callback(err);
      } else {
        unsoldProducts = _.map(unsoldProducts, function(unsoldProduct) {
          return mapper.map(unsoldProduct, DICTIONARY);
        });
        callback(null, unsoldProducts);
      }
    });
  });
};

module.exports.get = function(userId, unsoldProductId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT product_info.*, product_specification.* ' +
              'FROM product_info INNER JOIN product_specification ' +
              'ON (product_info_spec_id = product_spec_id) ' +
              'WHERE product_seller_id = ? AND product_spec_is_draft = 0 AND product_id NOT IN (' +
              'SELECT product_id ' +
              'FROM invoice_history INNER JOIN invoice_item_history INNER JOIN user_login_info ' +
              'INNER JOIN product_info INNER JOIN product_specification ' +
              'ON (invoice_id = invoice_item_invoice_id AND invoice_user_id = user_login_id ' +
              'AND invoice_item_product_id = product_id AND product_info_spec_id = product_spec_id) ' +
              'WHERE product_seller_id = ? AND product_id = ?)';
    connection.query(sql, [userId, userId, unsoldProductId], function(err, unsoldProduct) {
      callback(err, mapper.map(unsoldProduct[0], DICTIONARY));
    });
  });
};


