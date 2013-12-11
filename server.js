'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    mysql = require('mysql'),
    passport = require('passport'),
    path = require('path'),
    _ = require('underscore');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

  // Load configurations
  // if test env, load example file
  //var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  //    config = require('./config/config'),
  //    auth = require('./config/middlewares/authorization');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.LOG_QUERIES = process.env.LOG_QUERIES || 'true';

var config = require('./config/config'),
    auth = require('./config/middlewares/authorization');

// Create connection pools;
var pool = mysql.createPool(config.db);
var executor = require('./app/queryexecutor')(pool);

// Bootstrap models
var modelsPath = path.join(__dirname, 'app/models');
fs.readdirSync(modelsPath).forEach(function(file) {
  require(modelsPath + '/' + file).init(executor);
});

// bootstrap passport config
require('./config/passport')(passport);

var app = express();

//express settings
require('./config/express')(app, passport);

//Bootstrap routes
require('./config/routes')(app, passport, auth);

//Start the app by listening on <port>
var port = config.port;
app.listen(port);
console.log('Express App started on port ' + port);

//expose app
exports = module.exports = app;

// Bid Updater

var mapper = require('./app/mapper');
var logger = require('./app/logger');

var PRODUCT_DICTIONARY = {
  'product_id': 'id',
  'product_seller_id': 'sellerId',
  'product_quantity_remaining': 'quantityRemaining',
  'product_info_spec_id': 'specId',
  'product_spec_name': 'productName'
};

var WINNER_DICTIONARY = {
  'bid_user_id': 'userId'
};

var CART_DICTIONARY = {
  'cart_id': 'id'
};

setInterval(function updateBidEndDate(callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var getProducts = 'SELECT * FROM products ' +
          'WHERE product_spec_bid_end_date <= CURRENT_TIMESTAMP AND product_depletion_date IS NULL';
      connection.query(getProducts, function(err, productsToUpdate) {
        logger.logQuery('bidder_process:', this.sql);
        if(err) {
          callback(err);
        } else {
          if(!_.isEmpty(productsToUpdate)) {

            productsToUpdate = mapper.mapCollection(productsToUpdate, PRODUCT_DICTIONARY);

            var getWinnerInfo = 'SELECT bid_user_id FROM bid_history INNER JOIN product_info ' +
                'ON (bid_history.bid_product_id = product_info.product_id) ' +
                'WHERE product_id = ? ' +
                'ORDER BY bid_history.bid_amount DESC ' +
                'LIMIT 0, 1';
            var getWinnerCart = 'SELECT cart_id ' +
                'FROM cart_history ' +
                'WHERE cart_user_id = ? AND cart_closed_date IS NULL';
            var insertItemInCart = 'INSERT INTO cart_item_history ' +
                '(cart_item_cart_id, cart_item_product_id, cart_item_quantity, cart_item_is_bid_item) ' +
                'VALUES (?, ?, ?, TRUE)';
            var updateQuantity = 'UPDATE product_quantity_record ' +
                'SET product_quantity_remaining = product_quantity_remaining - 1 ' +
                'WHERE product_quantity_spec_id = ?';
            var closeProductBids = 'UPDATE bid_history ' +
                'SET bid_closed_date = CURRENT_TIMESTAMP ' +
                'WHERE bid_product_id = ?';
            var notifyUser = 'INSERT INTO notification_history ' +
                '(notification_user_id, notification_message, notification_is_read) ' +
                'VALUES(?, ?, FALSE)';
            var notifySeller = 'INSERT INTO notification_history ' +
                '(notification_user_id, notification_message, notification_is_read) ' +
                'VALUES(?, ?, FALSE)';
            var depleteItem = 'UPDATE product_info ' +
                'SET product_depletion_date = CURRENT_TIMESTAMP ' +
                'WHERE product_info_spec_id = ?';

            _.each(productsToUpdate, function(productToUpdate) {

              connection.beginTransaction(function(err) {
                if(err) {
                  callback(err);
                } else {
                  connection.query(getWinnerInfo, [productToUpdate.id], function(err, winnerInfo) {
                    logger.logQuery('bidder_process:', this.sql);
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    } else {
                      winnerInfo = mapper.map(winnerInfo[0], WINNER_DICTIONARY);
                      connection.query(getWinnerCart, [winnerInfo.userId], function(err, winnerCart) {
                        logger.logQuery('bidder_process:', this.sql);
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        } else {
                          winnerCart = mapper.map(winnerCart[0], CART_DICTIONARY);
                          var insertItemInCartParams = [winnerCart.id, productToUpdate.id, 1];
                          connection.query(insertItemInCart, insertItemInCartParams, function(err) {
                            logger.logQuery('bidder_process:', this.sql);
                            if(err) {
                              connection.rollback(function() {
                                callback(err);
                              });
                            } else {
                              connection.query(updateQuantity, [productToUpdate.specId], function(err) {
                                logger.logQuery('bidder_process:', this.sql);
                                if(err) {
                                  connection.rollback(function() {
                                    callback(err);
                                  });
                                } else {
                                  connection.query(closeProductBids, [productToUpdate.id], function(err) {
                                    logger.logQuery('bidder_process:', this.sql);
                                    if(err) {
                                      connection.rollback(function() {
                                        callback(err);
                                      });
                                    } else {
                                      var uMsg = 'You have won the bid for product ' + productToUpdate.productName;
                                      connection.query(notifyUser, [winnerInfo.userId, uMsg], function(err) {
                                        logger.logQuery('bidder_process:', this.sql);
                                        if(err) {
                                          connection.rollback(function() {
                                            callback(err);
                                          });
                                        } else {
                                          var sMsg = 'You have sold the bid for product ' + productToUpdate.productName;
                                          var notifySellerParams = [productToUpdate.sellerId, sMsg];
                                          connection.query(notifySeller, notifySellerParams, function(err) {
                                            logger.logQuery('bidder_process:', this.sql);
                                            if(err) {
                                              connection.rollback(function() {
                                                callback(err);
                                              });
                                            } else {
                                              if(productToUpdate.quantityRemaining - 1 === 0) {
                                                connection.query(depleteItem, [productToUpdate.specId], function(err) {
                                                  logger.logQuery('bidder_process:', this.sql);
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
                                                        callback(null, null);
                                                        console.log('New Winner of Bid Updated Successfully.');
                                                      }
                                                    });
                                                  }
                                                });
                                              }
                                              else {
                                                connection.commit(function(err) {
                                                  if(err) {
                                                    connection.rollback(function() {
                                                      callback(err);
                                                    });
                                                  } else {
                                                    callback(null, null);
                                                    console.log('New Winner of Bid Updated Successfully.');
                                                  }
                                                });
                                              }
                                            }
                                          });
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            });
          }
        }
      });
    }
  });
}, 5000);
