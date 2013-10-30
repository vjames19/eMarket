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

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT products.* ' +
        'FROM user_info INNER JOIN invoice_history INNER JOIN invoice_item_history INNER JOIN products ' +
        'ON (user_id=invoice_user_id ' +
        'AND invoice_item_invoice_id=invoice_id ' +
        'AND invoice_item_product_id=product_id) ' +
        'WHERE user_id=? ' +
        'ORDER BY invoice_creation_date DESC'
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

module.exports.get = function(userId, invoiceItemId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT products.* ' +
        'FROM user_info INNER JOIN invoice_history INNER JOIN invoice_item_history INNER JOIN products ' +
        'ON (user_id=invoice_user_id ' +
        'AND invoice_item_invoice_id=invoice_id ' +
        'AND invoice_item_product_id=product_id) ' +
        'WHERE user_id=? AND invoice_item_id=? ' +
        'ORDER BY invoice_creation_date DESC'

    connection.query(sql, [userId, invoiceItemId], function(err, products) {
      callback(err, mapper.map(products[0], DICTIONARY));
    });
  });
};
