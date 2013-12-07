'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

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
  'curren_bid': 'currentBid',
  'invoice_item_quantity': 'purchasedQuantity'
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
      var sql = 'SELECT invoice_id, SUM(invoice_item_sold_price) AS total, invoice_creation_date ' +
          'FROM invoice_history INNER JOIN user_info INNER JOIN invoice_item_history ' +
          'ON (invoice_history.invoice_user_id=user_info.user_id AND invoice_id=invoice_item_id) ' +
          'WHERE invoice_user_id = ? ' +
          'GROUP BY invoice_item_invoice_id, invoice_creation_date ' +
          'ORDER BY invoice_creation_date DESC';
      connection.query(sql, [userId], function(err, invoices) {
        logger.logQuery('invoice_getAll:', this.sql);
        callback(err, mapper.mapCollection(invoices, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, invoiceId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT invoice_id, SUM(invoice_item_sold_price) AS total, invoice_creation_date ' +
          'FROM invoice_history INNER JOIN user_info INNER JOIN invoice_item_history ' +
          'ON (invoice_history.invoice_user_id=user_info.user_id AND invoice_id=invoice_item_id) ' +
          'WHERE invoice_user_id = ? AND invoice_id = ?' +
          'GROUP BY invoice_item_invoice_id, invoice_creation_date ' +
          'ORDER BY invoice_creation_date DESC';
      connection.query(sql, [userId, invoiceId], function(err, invoices) {
        logger.logQuery('invoice_get:', this.sql);
        callback(err, mapper.map(invoices[0], DICTIONARY));
      });
    }
  });
};

module.exports.getProducts = function(userId, invoiceId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT products.*, invoice_item_quantity ' +
          'FROM invoice_history INNER JOIN active_users INNER JOIN invoice_item_history INNER JOIN products ' +
          'ON (invoice_history.invoice_user_id=user_id AND invoice_id=invoice_item_invoice_id ' +
          'AND products.product_id=invoice_item_product_id) ' +
          'WHERE user_id = ? AND invoice_history.invoice_id = ?';
      connection.query(sql, [userId, invoiceId], function(err, products) {
        logger.logQuery('invoice_getProducts:', this.sql);
        callback(err, mapper.mapCollection(products, PRODUCT_DICTIONARY));
      });
    }
  });
};
