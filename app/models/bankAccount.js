'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

var DICTIONARY = {
  'bank_id': 'id',
  'bank_name': 'bankName',
  'bank_account_owner_name': 'ownerName',
  'bank_account_type': 'accountType',
  'bank_account_number': 'accountNumber',
  'bank_routing_number': 'routingNumber',
  'billing_address_id': 'addressId',
  'billing_id': 'billId'
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
      var sql = 'SELECT bank_id, bank_name, bank_account_owner_name, bank_account_type, ' +
          'bank_account_number, bank_routing_number, billing_address_id, billing_id ' +
          'FROM bank_info INNER JOIN billing_info ' +
          'ON ( bank_info.bank_billing_address_id = billing_info.billing_id ) ' +
          'WHERE bank_info.bank_user_id = ? AND bank_info.bank_status = 1 ' +
          'ORDER BY bank_name';
      connection.query(sql, [userId], function(err, bankAccounts) {
        logger.logQuery('bankAcc_getAll:', this.sql);
        callback(err, mapper.mapCollection(bankAccounts, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, cardId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT bank_id, bank_name, bank_account_owner_name, bank_account_type, ' +
          'bank_account_number, bank_routing_number, billing_address_id, billing_id ' +
          'FROM bank_info INNER JOIN billing_info ' +
          'ON ( bank_info.bank_billing_address_id = billing_info.billing_id ) ' +
          'WHERE bank_info.bank_user_id = ? AND bank_info.bank_status = 1 AND bank_info.bank_id = ? ' +
          'ORDER BY bank_name';
      connection.query(sql, [userId, cardId], function(err, bankAccount) {
        logger.logQuery('bankAcc_get:', this.sql);
        callback(err, mapper.map(bankAccount[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(bank, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'INSERT INTO bank_info ' +
          '(bank_user_id, bank_billing_address_id, bank_name, bank_account_owner_name, ' +
          'bank_account_type, bank_account_number, bank_routing_number, bank_status) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      var params = [
        userId, bank.addressId, bank.bankName, bank.ownerName,
        bank.accountType, bank.accountNumber, bank.routingNumber, true
      ];
      connection.query(sql, params, function(err) {
        logger.logQuery('bankAcc_create:', this.sql);
        callback(err, bank);
      });
    }
  });
};

module.exports.update = function(bank, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'UPDATE bank_info ' +
          'SET bank_billing_address_id = ?, bank_name = ?, bank_account_owner_name = ?, ' +
          'bank_account_type = ?, bank_account_number = ?, bank_routing_number = ? ' +
          'WHERE bank_id = ? AND bank_user_id = ?';
      var params = [
        bank.billId, bank.bankName, bank.ownerName,
        bank.accountType, bank.accountNumber, bank.routingNumber,
        bank.id, userId
      ];
      connection.query(sql, params, function(err) {
        logger.logQuery('bankAcc_update:', this.sql);
        callback(err, bank);
      });
    }
  });
};

module.exports.remove = function(bank, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'SELECT * ' +
          'FROM bank_info as BANK ' +
          'WHERE BANK.bank_user_id = ? AND BANK.bank_status != FALSE';
      var sql2 = 'UPDATE bank_info ' +
          'SET bank_status = FALSE ' +
          'WHERE bank_id = ?';
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, [userId], function(err, result) {
            logger.logQuery('bankAcc_remove:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              if(result.length > 1) {
                connection.query(sql2, [bank.id], function(err) {
                  logger.logQuery('bankAcc_remove:', this.sql);
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
                        callback(null, bank);
                        console.log('Bank Removed Successfully.');
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
                    console.log('Bank Not Removed Successfully. Last Bank.');
                  }
                });
              }
            }
          });
        }
      });
    }
  });
};
