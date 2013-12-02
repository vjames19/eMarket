'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'credit_card_id': 'id',
  'credit_card_type': 'cardType',
  'credit_card_owner_name': 'ownerName',
  'credit_card_expiration_date': 'expirationDate',
  'credit_card_number': 'cardNumber',
  'credit_card_csv': 'cardCsv',
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
      var sql = 'SELECT credit_card_id, credit_card_type, credit_card_owner_name, ' +
          'credit_card_expiration_date, credit_card_number, credit_card_csv, ' +
          'billing_address_id, billing_id ' +
          'FROM credit_card_info INNER JOIN billing_info ' +
          'ON ( credit_card_info.credit_card_billing_address_id = billing_info.billing_id ) ' +
          'WHERE credit_card_info.credit_card_user_id = ? AND credit_card_info.credit_card_status = 1';
      connection.query(sql, [userId], function(err, creditCards) {
        callback(err, mapper.mapCollection(creditCards, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, cardId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT credit_card_id, credit_card_type, credit_card_owner_name, ' +
          'credit_card_expiration_date, credit_card_number, credit_card_csv, ' +
          'billing_address_id, billing_id ' +
          'FROM credit_card_info INNER JOIN billing_info ' +
          'ON ( credit_card_info.credit_card_billing_address_id = billing_info.billing_id ) ' +
          'WHERE credit_card_info.credit_card_user_id = ? AND credit_card_info.credit_card_status = 1 ' +
          'AND credit_card_info.credit_card_id = ?';
      connection.query(sql, [userId, cardId], function(err, creditCard) {
        callback(err, mapper.map(creditCard[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(card, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'INSERT INTO credit_card_info ' +
          '(credit_card_user_id, credit_card_billing_address_id, credit_card_type, credit_card_owner_name, ' +
          'credit_card_expiration_date, credit_card_number, credit_card_csv, credit_card_status) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      var params = [
        userId, card.addressId, card.cardType, card.ownerName,
        card.expirationDate, card.cardNumber, card.cardCsv, true
      ];
      connection.query(sql, params, function(err) {
        callback(err, card);
      });
    }
  });
};

module.exports.update = function(card, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'UPDATE credit_card_info ' +
          'SET credit_card_billing_address_id = ?, credit_card_type = ?, credit_card_owner_name = ?, ' +
          'credit_card_expiration_date = ?, credit_card_number = ?, credit_card_csv = ? ' +
          'WHERE credit_card_id = ? AND credit_card_user_id = ?';
      var params = [
        card.billId, card.cardType, card.ownerName, card.expirationDate,
        card.cardNumber, card.cardCsv, card.id, userId
      ];
      connection.query(sql, params, function(err) {
        callback(err, card);
      });
    }
  });
};
