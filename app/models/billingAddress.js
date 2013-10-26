'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'billing_id': 'id',
  'billing_user_id': 'userId',
  'billing_recipient_name': 'recipientName',
  'billing_telephone': 'telephone',
  'address_address': 'address',
  'address_country': 'country',
  'address_city': 'city',
  'address_geographical_region': 'geographicalRegion',
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
    var sql = 'SELECT billing_id, billing_recipient_name, billing_telephone, ' +
        'address_address, address_country, address_city, address_geographical_region, address_zipcode ' +
        'FROM billing_info INNER JOIN address_history ' +
        'ON (billing_info.billing_address_id = address_history.address_id) ' +
        'WHERE billing_info.billing_user_id = ? AND billing_info.billing_status = 1 ' +
        'ORDER BY address_geographical_region';
    connection.query(sql, [userId], function(err, billingAddresses) {
      if(err) {
        callback(err);
      } else {
        billingAddresses = _.map(billingAddresses, function(billingAddress) {
          return mapper.map(billingAddress, DICTIONARY);
        });
        callback(null, billingAddresses);
      }
    });
  });
};

module.exports.get = function(userId, billingId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT billing_id, billing_recipient_name, billing_telephone, ' +
        'address_address, address_country, address_city, address_geographical_region, address_zipcode ' +
        'FROM billing_info INNER JOIN address_history INNER JOIN user_info ' +
        'ON (billing_info.billing_address_id=address_history.address_id) AND (billing_info.billing_user_id=user_info.user_id) ' +
        'WHERE user_info.user_id = ? AND billing_info.billing_status = 1 AND billing_info.billing_id = ? ' +
        'ORDER BY address_geographical_region';
    connection.query(sql, [userId, billingId], function(err, billingAddress) {
      callback(err, mapper.map(billingAddress[0], DICTIONARY));
    });
  });
};


