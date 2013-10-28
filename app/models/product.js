'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'product_id': 'id',
  'product_seller_id': 'sellerId',
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

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * FROM product_info JOIN product_specification ' +
        'ON (product_info.product_info_spec_id=product_specification.product_spec_id) ' +
        'WHERE product_specification.product_spec_is_draft=0;';
    connection.query(sql, function(err, products) {
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

module.exports.get = function(id, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * FROM product_info JOIN product_specification ' +
        'ON (product_info.product_info_spec_id=product_specification.product_spec_id) ' +
        'WHERE product_specification.product_spec_is_draft=0 AND product_info.product_id = ?';
    connection.query(sql, [id], function(err, products) {
      callback(err, mapper.map(products[0], DICTIONARY));
    });
  });
};
