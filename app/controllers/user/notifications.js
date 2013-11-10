'use strict';

var _ = require('underscore');
var Notification = require('../../models/notification.js');

// Notifications
var notifications = {
  1: {
    id: 1,
    notificationId: 1,
    userId: 1,
    message: 'You have won an ultrabook!',
    notificationDate: '10-10-2013',
    isRead: true
  },
  2: {
    id: 2,
    notificationId: 2,
    userId: 1,
    message: 'You have won a car!',
    notificationDate: '10-10-2013',
    isRead: false
  },
  3: {
    id: 3,
    notificationId: 3,
    userId: 2,
    message: 'You have won a pig!',
    notificationDate: '10-10-2013',
    isRead: false
  }
};

exports.findNotificationById = function(req, res, next, id) {
  if(!notifications[+id]) {
    res.jsonp(404, {message: 'Notification Not Found'});
  } else {
    req.notification = notifications[+id];
    next();
  }
};

exports.readAllNotifications = function(req, res) {
  Notification.getAll(req.params.userId, function(err, notifications) {
    res.jsonp(notifications);
  });
};

exports.createNotification = function(req, res) {
  var notification = req.body;
  notification.notificationId = _.keys(notifications).length + 1;
  notifications[notification.notificationId] = notification;
  res.jsonp(notification);
};

exports.readNotification = function(req, res) {
  res.jsonp(req.notification);
};

exports.updateNotification = function(req, res) {
  _.extend(req.notification, req.body);
  notifications[req.notification.notificationId] = req.notification;
  res.jsonp(req.notification);
};

exports.deleteNotification = function(req, res) {
  delete notifications[req.notification.notificationId];
  res.jsonp(req.notification);
};
