'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'notification_id': 'id',
  'notification_user_id': 'userId',
  'notification_message': 'message',
  'notification_date': 'date',
  'notification_is_read': 'isRead'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * FROM notification_history WHERE notification_user_id = ? ' +
        'ORDER BY notification_date DESC, notification_is_read ASC';
    connection.query(sql, [userId], function(err, notifications) {
      if(err) {
        callback(err);
      } else {
        notifications = _.map(notifications, function(notification) {
          return mapper.map(notification, DICTIONARY);
        });
        callback(null, notifications);
      }
    });
  });
};

module.exports.get = function(userId, notificationId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * FROM notification_history WHERE notification_user_id = ? AND notification_id = ?';
    connection.query(sql, [userId, notificationId], function(err, notifications) {
      callback(err, mapper.map(notifications[0], DICTIONARY));
    });
  });
};
