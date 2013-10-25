'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'bid_id': 'id',
  'bid_user_id': 'userId',
  'bid_product_id': 'productId',
  'bid_amount': 'amount',
  'bid_creation_date': 'creationDate',
  'bid_closed_date' : 'closedDate'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * FROM bid_history' +
        'WHERE bid_user_id = ?' +
        'ORDER BY bid_creation_date DESC';
    connection.query(sql, [userId], function(err, bids) {
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

module.exports.get = function(userId, bidId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * FROM bid_history WHERE bid_user_id = ? AND bid = ?';
    connection.query(sql, [userId, bidId], function(err, bids) {
      callback(err, mapper.map(bids[0], DICTIONARY));
    });
  });
};
