'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');
var _ = require('underscore');

var DICTIONARY = {
  'bid_id': 'id',
  'bid_user_id': 'userId',
  'bid_product_id': 'productId',
  'bid_amount': 'bidAmount',
  'bid_creation_date': 'creationDate',
  'bid_closed_date': 'closedDate',
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
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT bid_history.*, MAX(bid_amount) AS highest_bid, products.* ' +
          'FROM bid_history INNER JOIN active_users INNER JOIN products ' +
          'ON (bid_user_id = user_id AND bid_product_id = product_id) ' +
          'WHERE user_id = ? ' +
          'GROUP BY bid_product_id ' +
          'ORDER BY bid_creation_date DESC';
      connection.query(sql, [userId], function(err, bids) {
        logger.logQuery('bid_getAll:', this.sql);
        callback(err, mapper.mapCollection(bids, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, bidId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT bid_history.*, MAX(bid_amount) AS highest_bid, products.* ' +
          'FROM bid_history INNER JOIN active_users INNER JOIN products ' +
          'ON (bid_user_id = user_id AND bid_product_id = product_id) ' +
          'WHERE user_id = ? AND bid_id = ? ' +
          'GROUP BY bid_product_id ' +
          'ORDER BY bid_creation_date DESC';
      connection.query(sql, [userId, bidId], function(err, bids) {
        logger.logQuery('bid_get:', this.sql);
        callback(err, mapper.map(bids[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(itemBid, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'SELECT current_bid ' +
                 'FROM products ' +
                  'WHERE product_id = ?';
      var sql2 = 'INSERT INTO bid_history ' +
                 '(bid_user_id, bid_product_id, bid_amount) ' +
                 'VALUES (?, ?, ?)';
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, itemBid.id, function(err, currentBidToBeUsed) {
            logger.logQuery('product_current_bid:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              var latestBid = mapper.map(currentBidToBeUsed[0], DICTIONARY);

              if(_.isEmpty(latestBid.currentBid)) {
                 if(itemBid.startingBidPrice + 5 > itemBid.bidAmount || itemBid.bidAmount >= 99999999999.99) {
                   connection.commit(function(err) {
                     if(err) {
                       connection.rollback(function(err) {
                         callback(err);
                       });
                     } else {
                       callback(null, null);
                       console.log('Cannot Place Bid Successfully.');
                     }
                   });
                 } else {
                   var params2 = [userId, itemBid.id, itemBid.bidAmount];
                   connection.query(sql2, params2, function(err) {
                     logger.logQuery('bid_create:', this.sql);
                     if(err) {
                       connection.rollback(function() {
                         callback(err);
                       });
                     } else {
                       connection.commit(function(err) {
                         if(err) {
                           connection.rollback(function() {
                             callback(err);
                           });
                         } else {
                           callback(null, itemBid);
                           console.log('Bid added successful');
                         }
                       });
                     }
                   });
                 }
              }
              else {
                if(latestBid.currentBid + 5 > itemBid.bidAmount || itemBid.bidAmount >= 99999999999.99) {
                  connection.commit(function(err) {
                    if(err) {
                      connection.rollback(function(err) {
                        callback(err);
                      });
                    } else {
                      callback(null, null);
                      console.log('Cannot Place Bid Successfully.');
                    }
                  });
                } else {
                  var params2 = [userId, itemBid.id, itemBid.bidAmount];
                  connection.query(sql2, params2, function(err) {
                    logger.logQuery('bid_create:', this.sql);
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    } else {
                      connection.commit(function(err) {
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        } else {
                          callback(null, itemBid);
                          console.log('Bid added successful');
                        }
                      });
                    }
                  });
                }
              }
            }
          });
        }
      });
    }
  });
};
