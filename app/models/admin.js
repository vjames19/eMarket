'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'admin_id': 'id',
  'admin_user_name': 'username',
  'admin_email': 'email',
  'admin_first_name': 'firstName',
  'admin_middle_name': 'middleName',
  'admin_last_name': 'lastName',
  'admin_telephone': 'telephone',
  'admin_is_root': 'isRoot'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT admin_info.* ' +
        'FROM admin_info ' +
        'WHERE admin_account_status = 1';
    connection.query(sql, function(err, admins) {
      if(err) {
        callback(err);
      } else {
        callback(null, mapper.mapCollection(admins, DICTIONARY));
      }
    });
  });
};

module.exports.get = function(id, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT admin_info.* ' +
        'FROM admin_info ' +
        'WHERE admin_id = ? AND admin_account_status = 1';
    connection.query(sql, [id], function(err, admins) {
      var admin = mapper.map(admins[0], DICTIONARY);
      if(admins.length > 0) {
        admin.isAdmin = !_.isEmpty(admin); // For hasAuth Checks
      }
      callback(err, admin);
    });
  });
};

module.exports.create = function(admin, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'INSERT INTO admin_info ' +
          '(admin_user_name, admin_password, admin_email, admin_first_name, admin_middle_name, admin_last_name, ' +
          'admin_telephone, admin_is_root, admin_account_status) ' +
          'VALUES (LCASE(?), SHA1(?), LCASE(?), ?, ?, ?, ?, ?, TRUE)';
      var params = [admin.username, admin.password, admin.email, admin.firstName,
        admin.middleName, admin.lastName, admin.telephone, admin.isRoot];
      connection.query(sql, params, function(err, insertStatus) {
        if(err) {
          callback(err);
        } else {
          admin.id = insertStatus.insertId;
          callback(null, admin);
        }
      });
    }
  });
};

module.exports.update = function(admin, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql, params;
      if(admin.password) {
        sql = 'UPDATE admin_info ' +
            'SET admin_password = SHA1(?), admin_email = LCASE(?), admin_first_name = ?, ' +
            'admin_middle_name = ?, admin_last_name = ?, admin_telephone = ?, admin_is_root = ? ' +
            'WHERE admin_id = ?';
        params = [admin.password, admin.email, admin.firstName, admin.middleName,
          admin.lastName, admin.telephone, admin.isRoot, admin.id];
      } else {
        sql = 'UPDATE admin_info ' +
            'SET admin_email = LCASE(?), admin_first_name = ?, ' +
            'admin_middle_name = ?, admin_last_name = ?, admin_telephone = ?, admin_is_root = ? ' +
            'WHERE admin_id = ?';
        params = [admin.email, admin.firstName, admin.middleName,
          admin.lastName, admin.telephone, admin.isRoot, admin.id];
      }
      connection.query(sql, params, function(err) {
        callback(err, admin);
      });
    }
  });
};

module.exports.remove = function(id, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'UPDATE admin_info ' +
          'SET admin_account_status = 0 ' +
          'WHERE admin_id = ?';
      connection.query(sql, [id], function(err) {
        callback(err, id);
      });
    }
  });
};

module.exports.authenticate = function(username, password, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT admin_id, admin_user_name, admin_is_root ' +
        'FROM admin_info ' +
        'WHERE admin_user_name = LCASE(?) AND admin_password = SHA1(?) AND admin_account_status = 1';
    connection.query(sql, [username, password], function(err, admins) {
      var admin = mapper.map(admins[0], DICTIONARY);
      if(admins.length > 0) {
        admin.isAdmin = !_.isEmpty(admin); // For hasAuth Checks
      }
      callback(err, admin);
    });
  });
};

module.exports.isAdmin = function(admin) {
  return admin.hasOwnProperty('isAdmin') && admin.isAdmin;
};
