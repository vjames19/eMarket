'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'bid_id': 'id',
  'bid_user_id': 'userId',
  'bid_product_id': 'productId',
  'bid_amount': 'bidAmount',
  'bid_creation_date': 'creationDate',
  'bid_closed_date' : 'closedDate',
  'highest_bid': 'highestBid',
  'product_seller_id': 'sellerId',
  'seller_name': 'sellerName',
  'product_creation_date': 'creationDate',
  'product_spec_category_id': 'categoryId',
  'category_name': 'categoryName',
  'product_spec_name': 'productName',
  'product_spec_nonbid_price': 'nonbidPrice',
  'product_spec_starting_bid_price': 'startingBidPrice',
  'current_bid': 'currentBid',
  'product_spec_bid_end_date': 'bidEndDate',
  'product_spec_shipping_price': 'shippingPrice',
  'product_total_price': 'productTotalPrice',
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
    var sql = 'SELECT bid_history.*, MAX(bid_amount) AS highest_bid, products.* ' +
              'FROM bid_history INNER JOIN active_users INNER JOIN products ' +
              'ON (bid_user_id = user_id AND bid_product_id = product_id) ' +
              'WHERE user_id = ? ' +
              'GROUP BY bid_product_id ' +
              'ORDER BY bid_creation_date DESC';
    connection.query(sql, [userId], function(err, bids) {
      if(err) {
        callback(err);
      } else {
        callback(null, mapper.mapCollection(bids, DICTIONARY));
      }
    });
  });
};

module.exports.get = function(userId, bidId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT bid_history.*, MAX(bid_amount) AS highest_bid, products.* ' +
              'FROM bid_history INNER JOIN active_users INNER JOIN products ' +
              'ON (bid_user_id = user_id AND bid_product_id = product_id) ' +
              'WHERE user_id = ? AND bid_id = ? ' +
              'GROUP BY bid_product_id ' +
              'ORDER BY bid_creation_date DESC';
    connection.query(sql, [userId, bidId], function(err, bids) {
      callback(err, mapper.map(bids[0], DICTIONARY));
    });
  });
};
