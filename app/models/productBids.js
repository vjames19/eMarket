'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

var DICTIONARY = {
  'bid_id': 'id',
  'bid_user_id': 'bidderId',
  'bid_product_id': 'productId',
  'bid_amount': 'bidAmount',
  'bid_creation_date': 'creationDate',
  'bid_closed_date': 'closedDate',
  'seller_name': 'sellerName',
  'user_login_user_name': 'bidderName'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(productId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT bid_history.*,  products.seller_name, active_users.user_login_user_name ' +
          'FROM bid_history INNER JOIN products INNER JOIN active_users ' +
          'ON (bid_history.bid_product_id = products.product_id AND active_users.user_id = bid_history.bid_user_id) ' +
          'WHERE bid_history.bid_closed_date IS NULL AND ' +
          'products.product_id = ? ' +
          'ORDER BY bid_amount DESC';
      connection.query(sql, [productId], function(err, bids) {
        logger.logQuery('productBids_getAll:', this.sql);
        callback(err, mapper.mapCollection(bids, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(productId, bidId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT bid_history.*,  products.seller_name, active_users.user_login_user_name ' +
          'FROM bid_history INNER JOIN products INNER JOIN active_users ' +
          'ON (bid_history.bid_product_id = products.product_id AND active_users.user_id = bid_history.bid_user_id) ' +
          'WHERE bid_history.bid_closed_date IS NULL AND ' +
          'products.product_id = ? AND bid_history.bid_id = ? ' +
          'ORDER BY bid_amount DESC';
      connection.query(sql, [productId, bidId], function(err, bids) {
        logger.logQuery('productBids_get:', this.sql);
        callback(err, mapper.map(bids[0], DICTIONARY));
      });
    }
  });
};
