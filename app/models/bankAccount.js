'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'bank_id': 'id',
  'bank_name': 'bankName',
  'bank_account_owner_name': 'ownerName',
  'bank_account_type': 'accountType',
  'bank_account_number': 'accountNumber',
  'bank_routing_number': 'routingNumber',
  'billing_address_id' : 'addressId'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT bank_id, bank_name, bank_account_owner_name, bank_account_type, ' +
        'bank_account_number, bank_routing_number, billing_address_id ' +
        'FROM bank_info INNER JOIN billing_info ' +
        'ON ( bank_info.bank_billing_address_id = billing_info.billing_id ) ' +
        'WHERE bank_info.bank_user_id = ? AND bank_info.bank_status = 1 ' +
        'ORDER BY bank_name';
    connection.query(sql, [userId], function(err, bankAccounts) {
      if(err) {
        callback(err);
      } else {
        bankAccounts = _.map(bankAccounts, function(bankAccount) {
          return mapper.map(bankAccount, DICTIONARY);
        });
        callback(null, bankAccounts);
      }
    });
  });
};

module.exports.get = function(userId, cardId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT bank_id, bank_name, bank_account_owner_name, bank_account_type, ' +
        'bank_account_number, bank_routing_number, billing_address_id ' +
        'FROM bank_info INNER JOIN billing_info ' +
        'ON ( bank_info.bank_billing_address_id = billing_info.billing_id ) ' +
        'WHERE bank_info.bank_user_id = ? AND bank_info.bank_status = 1 AND bank_info.bank_id = ? ' +
        'ORDER BY bank_name';
    connection.query(sql, [userId, cardId], function(err, bankAccount) {
      callback(err, mapper.map(bankAccount[0], DICTIONARY));
    });
  });
};

