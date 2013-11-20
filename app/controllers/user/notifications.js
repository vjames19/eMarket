'use strict';

var _ = require('underscore');
var Notification = require('../../models/notification.js');
var validator = require('../helpers/validator.js');

exports.validateNotification = function(req, res, next) {
  validator.validate('notification', Notification, req, res, next);
};

exports.findNotificationById = function(req, res, next, id) {
  Notification.get(req.params.userId, id, function(err, notification) {
    if(_.isEmpty(notification)) {
      res.jsonp(404, {message: 'Notification not Found'});
    } else {
      req.notification = notification;
      next();
    }
  });
};

exports.readAllNotifications = function(req, res) {
  Notification.getAll(req.params.userId, function(err, notifications) {
    res.jsonp(notifications);
  });
};

exports.readNotification = function(req, res) {
  res.jsonp(req.notification);
};

exports.createNotification = function(req, res) {
  Notification.create(req.params.userId, req.body, function(err, notification) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(201, notification);
    }
  });
};

exports.updateNotification = function(req, res) {
  _.extend(req.notification, req.body);
  Notification.update(req.notification, function(err, notification) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(notification);
    }
  });
};
