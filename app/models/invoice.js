'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'invoice_id': 'id',
  'invoice_creation_date': 'creationDate',
  'total': 'total'
};

var PRODUCT_DICTIONARY = {
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
  'curren_bid': 'currentBid'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT invoice_id, sum(invoice_item_quantity * invoice_item_sold_price) as total, invoice_creation_date ' +
        'FROM invoice_history inner join user_info inner join invoice_item_history ' +
        'ON (invoice_history.invoice_id=user_info.user_id AND invoice_id=invoice_item_id) ' +
        'WHERE user_id = ?' +
        'GROUP BY invoice_id, invoice_creation_date ' +
        'ORDER BY invoice_creation_date desc';
    connection.query(sql, [userId], function(err, invoices) {
      if(err) {
        callback(err);
      } else {
        invoices = _.map(invoices, function(invoice) {
          return mapper.map(invoice, DICTIONARY);
        });
        callback(null, invoices);
      }
    });
  });

};

module.exports.get = function(userId, invoiceId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT invoice_id, sum(invoice_item_quantity * invoice_item_sold_price) as total, invoice_creation_date ' +
        'FROM invoice_history inner join user_info inner join invoice_item_history ' +
        'ON (invoice_history.invoice_id=user_info.user_id AND invoice_id=invoice_item_id) ' +
        'WHERE user_id=? AND invoice_id=? ' +
        'GROUP BY invoice_id, invoice_creation_date ' +
        'ORDER BY invoice_creation_date desc';
    connection.query(sql, [userId, invoiceId], function(err, invoices) {
      callback(err, mapper.map(invoices[0], DICTIONARY));
    });
  });
};

module.exports.getProducts = function(userId, invoiceId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT products.* ' +
        'FROM invoice_history INNER JOIN active_users INNER JOIN invoice_item_history INNER JOIN products ' +
        'ON (invoice_history.invoice_id=user_id AND invoice_id=invoice_item_id ' +
        'AND products.product_id=invoice_item_product_id) ' +
        'WHERE user_id = ? AND invoice_history.invoice_id = ?';
    connection.query(sql, function(err, products) {
      if(err) {
        callback(err);
      } else {
        products = _.map(products, function(product) {
          return mapper.map(product, PRODUCT_DICTIONARY);
        });
        callback(null, products);
      }
    });
  });
};
