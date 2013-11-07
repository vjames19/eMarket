'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'bid_id': 'id',
  'bid_user_id': 'userId',
  'bid_product_id': 'productId',
  'bid_amount': 'bidAmount',
  'bid_creation_date': 'creationDate',
  'bid_closed_date': 'closedDate'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(productId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT bid_history.* ' +
        'FROM bid_history INNER JOIN product_info ' +
        'ON (bid_history.bid_product_id = product_info.product_id) ' +
        'INNER JOIN product_specification ' +
        'ON (product_info.product_info_spec_id = product_specification.product_spec_id) ' +
        'WHERE ' +
        'product_specification.product_spec_is_draft = FALSE ' +
        'AND ' +
        'product_specification.product_spec_id = ?' +
        'ORDER BY bid_amount DESC';
    connection.query(sql, [productId], function(err, bids) {
      if(err) {
        callback(err);
      } else {
        bids = _.map(bids, function(bid) {
          return mapper.map(bid, DICTIONARY);
        });
        callback(null, bids);
      }
    });
  });
};

module.exports.get = function(productId, bidId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT bid_history.* ' +
        'FROM bid_history INNER JOIN product_info ' +
        'ON (bid_history.bid_product_id = product_info.product_id) ' +
        'INNER JOIN product_specification ' +
        'ON (product_info.product_info_spec_id = product_specification.product_spec_id) ' +
        'WHERE ' +
        'product_specification.product_spec_is_draft = FALSE ' +
        'AND ' +
        'product_specification.product_spec_id = ?' +
        'AND ' +
        'bid_history.bid_id = ?' +
        'ORDER BY bid_amount DESC';
    connection.query(sql, [productId, bidId], function(err, bids) {
      callback(err, mapper.map(bids[0], DICTIONARY));
    });
  });
};
