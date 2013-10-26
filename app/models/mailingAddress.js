'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'mailing_id': 'id',
  'mailing_user_id': 'userId',
  'mailing_recipient_name': 'recipientName',
  'mailing_telephone': 'telephone',
  'mailing_is_primary': 'isPrimary',
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
    var sql = 'SELECT mailing_id, mailing_recipient_name, mailing_telephone, ' +
              'mailing_is_primary, address_address, address_country, address_city, address_geographical_region, address_zipcode ' +
              'FROM mailing_info INNER JOIN address_history INNER JOIN user_info ' +
              'ON (mailing_info.mailing_address_id=address_history.address_id) AND (mailing_info.mailing_user_id=user_info.user_id) ' +
              'WHERE user_info.user_id = ? AND mailing_info.mailing_status = 1 ' +
              'ORDER BY address_geographical_region';
    connection.query(sql, [userId], function(err, mailingAddresses) {
      if(err) {
        callback(err);
      } else {
        mailingAddresses = _.map(mailingAddresses, function(mailingAddress) {
          return mapper.map(mailingAddress, DICTIONARY);
        });
        callback(null, mailingAddresses);
      }
    });
  });
};

module.exports.get = function(userId, mailingId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT mailing_id, mailing_recipient_name, mailing_telephone, ' +
              'mailing_is_primary, address_address, address_country, address_city, address_geographical_region, address_zipcode ' +
              'FROM mailing_info INNER JOIN address_history INNER JOIN user_info ' +
              'ON (mailing_info.mailing_address_id=address_history.address_id) AND (mailing_info.mailing_user_id=user_info.user_id) ' +
              'WHERE user_info.user_id = ? AND mailing_info.mailing_status = 1 AND mailing_info.mailing_id = ? ' +
              'ORDER BY address_geographical_region';
    connection.query(sql, [userId, mailingId], function(err, mailingAddress) {
      callback(err, mapper.map(mailingAddress[0], DICTIONARY));
    });
  });
};

