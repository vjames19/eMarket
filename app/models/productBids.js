'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'bid_id': 'id',
  'bid_amount': 'bidAmount',
  'bid_creation_date': 'creationDate',
  'seller_name': 'seller'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(productId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT bid_history.bid_id, bid_history.bid_amount, bid_history.bid_creation_date, ' +
        'products.seller_name ' +
        'FROM bid_history INNER JOIN products ' +
        'ON (bid_history.bid_product_id = products.product_id) ' +
        'WHERE bid_history.bid_closed_date IS NULL AND ' +
        'products.product_id = ? ' +
        'ORDER BY bid_amount DESC';
    connection.query(sql, [productId], function(err, bids) {
      if(err) {
        callback(err);
      } else {
        callback(null, mapper.mapCollection(bids, DICTIONARY));
      }
    });
  });
};

module.exports.get = function(productId, bidId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT bid_history.bid_id, bid_history.bid_amount, bid_history.bid_creation_date, ' +
        'products.seller_name ' +
        'FROM bid_history INNER JOIN products ' +
        'ON (bid_history.bid_product_id = products.product_id) ' +
        'WHERE bid_history.bid_closed_date IS NULL AND ' +
        'products.product_id = ? AND bid_history.bid_id = ? ' +
        'ORDER BY bid_amount DESC';
    connection.query(sql, [productId, bidId], function(err, bids) {
      callback(err, mapper.map(bids[0], DICTIONARY));
    });
  });
};
