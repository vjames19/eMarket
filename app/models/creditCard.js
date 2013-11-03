'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'credit_card_id': 'id',
  'credit_card_type': 'cardType',
  'credit_card_owner_name': 'ownerName',
  'credit_card_expiration_date': 'expirationDate',
  'credit_card_number': 'cardNumber',
  'credit_card_csv': 'cardCsv',
  'billing_address_id': 'addressId'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {

    var sql = 'SELECT credit_card_id, credit_card_type, credit_card_owner_name, ' +
        'credit_card_expiration_date, credit_card_number, credit_card_csv, ' +
        'billing_address_id ' +
        'FROM credit_card_info INNER JOIN billing_info ' +
        'ON ( credit_card_info.credit_card_billing_address_id = billing_info.billing_id ) ' +
        'WHERE credit_card_info.credit_card_user_id = ? AND credit_card_info.credit_card_status = 1';
    connection.query(sql, [userId], function(err, creditCards) {
      if(err) {
        callback(err);
      } else {
        creditCards = _.map(creditCards, function(creditCard) {
          return mapper.map(creditCard, DICTIONARY);
        });
        callback(null, creditCards);
      }
    });
  });
};

module.exports.get = function(userId, cardId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT credit_card_id, credit_card_type, credit_card_owner_name, ' +
        'credit_card_expiration_date, credit_card_number, credit_card_csv, ' +
        'billing_address_id ' +
        'FROM credit_card_info INNER JOIN billing_info ' +
        'ON ( credit_card_info.credit_card_billing_address_id = billing_info.billing_id ) ' +
        'WHERE credit_card_info.credit_card_user_id = ? AND credit_card_info.credit_card_status = 1 ' +
        'AND credit_card_info.credit_card_id = ?';
    connection.query(sql, [userId, cardId], function(err, creditCard) {
      callback(err, mapper.map(creditCard[0], DICTIONARY));
    });
  });
};
