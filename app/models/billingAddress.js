'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

var DICTIONARY = {
  'billing_id': 'id',
  'billing_user_id': 'userId',
  'billing_recipient_name': 'recipientName',
  'billing_telephone': 'telephone',
  'billing_address_id': 'addressId',
  'address_address': 'address',
  'address_country': 'country',
  'address_city': 'city',
  'address_geographical_region': 'geoRegion',
  'address_zipcode': 'zipCode'
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
      var sql = 'SELECT billing_id, billing_user_id, billing_recipient_name, billing_telephone, billing_address_id, ' +
          'address_address, address_country, address_city, address_geographical_region, address_zipcode ' +
          'FROM billing_info INNER JOIN address_history ' +
          'ON (billing_info.billing_address_id = address_history.address_id) ' +
          'WHERE billing_info.billing_user_id = ? AND billing_info.billing_status = 1 ' +
          'ORDER BY address_geographical_region';
      connection.query(sql, [userId], function(err, billingAddresses) {
        logger.logQuery('bill_getAll:', this.sql);
        callback(err, mapper.mapCollection(billingAddresses, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, billingId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT billing_id, billing_user_id, billing_recipient_name, billing_telephone, billing_address_id, ' +
          'address_address, address_country, address_city, address_geographical_region, address_zipcode ' +
          'FROM billing_info INNER JOIN address_history INNER JOIN user_info ' +
          'ON (billing_info.billing_address_id = address_history.address_id) ' +
          'AND (billing_info.billing_user_id = user_info.user_id) ' +
          'WHERE user_info.user_id = ? AND billing_info.billing_status = 1 AND billing_info.billing_id = ? ' +
          'ORDER BY address_geographical_region';
      connection.query(sql, [userId, billingId], function(err, billingAddress) {
        logger.logQuery('bill_get:', this.sql);
        callback(err, mapper.map(billingAddress[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(billAddress, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'INSERT INTO address_history ' +
          '(address_address,address_country,address_city,address_geographical_region,address_zipcode) ' +
          'VALUES (?, ?, ?, ?, ?)';
      var sql2 = 'INSERT INTO billing_info ' +
          '(billing_user_id,billing_address_id,billing_recipient_name,billing_telephone,billing_status) ' +
          'VALUES (?, ?, ?, ?, ?)';
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          var params1 = [billAddress.billAddress, billAddress.country, billAddress.city,
            billAddress.geoRegion, billAddress.zipCode];
          connection.query(sql1, params1, function(err, insertStatus) {
            logger.logQuery('bill_create:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              var addressId = insertStatus.insertId;
              var params2 = [userId, addressId, billAddress.recipientName, billAddress.telephone, true];
              connection.query(sql2, params2, function(err) {
                logger.logQuery('bill_create:', this.sql);
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
                      callback(null, billAddress);
                      console.log('Billing Address Created Successfully.');
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
};

module.exports.update = function(billAddress, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'UPDATE address_history ' +
          'SET address_address = ?, address_country = ?, address_city = ?, ' +
          'address_geographical_region = ?, address_zipcode = ? ' +
          'WHERE address_id = ?';
      var sql2 = 'UPDATE billing_info ' +
          'SET billing_recipient_name = ?, billing_telephone = ? ' +
          'WHERE billing_id = ? AND billing_user_id = ?';
      connection.beginTransaction(function(err) {
        if(err) {
          connection.rollback(function() {
            callback(err);
          });
        } else {
          var params1 = [billAddress.address, billAddress.country, billAddress.city,
            billAddress.geoRegion, billAddress.zipCode, billAddress.addressId];
          connection.query(sql1, params1, function(err) {
            logger.logQuery('bill_update:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              var params2 = [billAddress.recipientName, billAddress.telephone, billAddress.id, userId];
              connection.query(sql2, params2, function(err) {
                logger.logQuery('bill_update:', this.sql);
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
                      callback(null, billAddress);
                      console.log('Billing Address Updated Successfully.');
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
};
