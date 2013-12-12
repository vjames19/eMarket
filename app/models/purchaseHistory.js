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
  'product_quantity_remaining': 'quantityRemaining',
  'invoice_creation_date': 'purchaseDate'
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
      var sql = 'SELECT non_draft_all_products.*, invoice_history.invoice_creation_date ' +
          'FROM user_info INNER JOIN invoice_history INNER JOIN invoice_item_history ' +
          'INNER JOIN non_draft_all_products ' +
          'ON (user_id=invoice_user_id ' +
          'AND invoice_item_invoice_id=invoice_id ' +
          'AND invoice_item_product_id=product_id) ' +
          'WHERE user_id=? ' +
          'ORDER BY invoice_creation_date DESC';
      connection.query(sql, [userId], function(err, products) {
        logger.logQuery('purchaseHistory_getAll:', this.sql);
        callback(err, mapper.mapCollection(products, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, invoiceItemId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT non_draft_all_products.* ' +
          'FROM user_info INNER JOIN invoice_history INNER JOIN invoice_item_history ' +
          'INNER JOIN non_draft_all_products ' +
          'ON (user_id=invoice_user_id ' +
          'AND invoice_item_invoice_id=invoice_id ' +
          'AND invoice_item_product_id=product_id) ' +
          'WHERE user_id=? AND invoice_item_id=? ' +
          'ORDER BY invoice_creation_date DESC';
      connection.query(sql, [userId, invoiceItemId], function(err, products) {
        logger.logQuery('purchaseHistory_get:', this.sql);
        callback(err, mapper.map(products[0], DICTIONARY));
      });
    }
  });
};
