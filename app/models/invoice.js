'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'invoice_id': 'id',
  'invoice_creation_date': 'creationDate',
  'total': 'total'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT invoice_id, sum(invoice_item_quantity * invoice_item_sold_price) as total, invoice_creation_date ' +
    'FROM invoice_history inner join user_info inner join invoice_item_history ' +
    'ON (invoice_history.invoice_id=user_info.user_id AND invoice_id=invoice_item_id) ' +
    'GROUP BY invoice_id, invoice_creation_date ' +
    'ORDER BY invoice_creation_date desc';
    connection.query(sql, function(err, invoices) {
      if(err) {
        callback(err);
      } else {
        invoices = _.map(invoices, function(invoice) {
          return mapper.map(invoice, DICTIONARY);
        });
        callback(null, invoices);
      }
    });
  });

};

module.exports.get = function(userId, invoiceId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT invoice_id, sum(invoice_item_quantity * invoice_item_sold_price) as total, invoice_creation_date ' +
        'FROM invoice_history inner join user_info inner join invoice_item_history ' +
        'ON (invoice_history.invoice_id=user_info.user_id AND invoice_id=invoice_item_id) ' +
        'WHERE user_id=? AND invoice_id=? ' +
        'GROUP BY invoice_id, invoice_creation_date ' +
        'ORDER BY invoice_creation_date desc';
    connection.query(sql, [userId, invoiceId], function(err, invoices) {
      callback(err, mapper.map(invoices[0], DICTIONARY));
    });
  });
};
