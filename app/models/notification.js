'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');
var validate = require('jsonschema').validate;

var DICTIONARY = {
  'notification_id': 'id',
  'notification_user_id': 'userId',
  'notification_message': 'message',
  'notification_date': 'date',
  'notification_is_read': 'isRead'
};

var SCHEMA = {
  'type': 'object',
  'properties': {
    'date': {
      'type': 'string',
      'required': true
    },
    'id': {
      'type': 'integer',
      'required': true
    },
    'isRead': {
      'type': 'integer',
      'minimum': 0,
      'maximum': 1,
      'required': true
    },
    'message': {
      'type': 'string',
      'required': true
    },
    'userId': {
      'type': 'integer',
      'required': false
    }
  }
};

module.exports.validate = function(object) {
  return validate(object, SCHEMA).errors;
};

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
      var sql = 'SELECT * FROM notification_history WHERE notification_user_id = ? ' +
          'ORDER BY notification_date DESC, notification_is_read ASC';
      connection.query(sql, [userId], function(err, notifications) {
        logger.logQuery('notification_getAll:', this.sql);
        callback(err, mapper.mapCollection(notifications, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, notificationId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT * FROM notification_history WHERE notification_user_id = ? AND notification_id = ?';
      connection.query(sql, [userId, notificationId], function(err, notifications) {
        logger.logQuery('notification_get:', this.sql);
        callback(err, mapper.map(notifications[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(userId, notification, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'INSERT INTO notification_history ' +
          '(notification_user_id, notification_message) ' +
          'VALUES (?,?)';
      connection.query(sql, [userId, notification.message], function(err, insertStatus) {
        logger.logQuery('notification_create:', this.sql);
        if(err) {
          callback(err);
        } else {
          notification.id = insertStatus.insertId;
          callback(null, notification);
        }
      });
    }
  });
};

module.exports.update = function(notification, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'UPDATE notification_history ' +
          'SET notification_is_read=? ' +
          'WHERE notification_id=?';
      connection.query(sql, [notification.isRead, notification.id], function(err) {
        logger.logQuery('notification_update:', this.sql);
        callback(err, notification);
      });
    }
  });
};
