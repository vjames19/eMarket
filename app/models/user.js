'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'user_id': 'id',
  'user_first_name': 'firstName',
  'user_middle_name': 'middleName',
  'user_last_name': 'lastName',
  'user_telephone': 'telephone',
  'user_login_email': 'email',
  'user_creation_date': 'creationDate',
  'user_login_user_name': 'username'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT user_info.*, user_login_email, user_login_user_name ' +
        'FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info ' +
        'ON user_info.user_id = user_account_status.user_account_id AND user_id = user_login_id ' +
        'WHERE user_account_status = 1 ';
    connection.query(sql, function(err, users) {
      if(err) {
        callback(err);
      } else {
        callback(null, mapper.mapCollection(users, DICTIONARY));
      }
    });
  });
};

module.exports.get = function(id, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT user_info.*, user_login_email, user_login_user_name ' +
        'FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info ' +
        'ON (user_info.user_id=user_account_status.user_account_id AND user_id=user_login_id) ' +
        'WHERE user_id = ? AND user_account_status=1';
    connection.query(sql, [id], function(err, users) {
      callback(err, mapper.map(users[0], DICTIONARY));
    });
  });
};

module.exports.authenticate = function(username, password, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT user_id, user_login_user_name ' +
        'FROM user_login_info INNER JOIN user_info INNER JOIN user_account_status ' +
        'ON (user_login_id=user_id AND user_id=user_account_id) ' +
        'WHERE user_login_user_name = ? AND user_login_password = SHA1(?) AND user_account_status=1';
    connection.query(sql, [username, password], function(err, users) {
      callback(err, mapper.map(users[0], DICTIONARY));
    });
  });
};
