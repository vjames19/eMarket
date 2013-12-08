'use strict';

var _ = require('underscore');
var Notification = require('../../models/notification.js');
var validator = require('../helpers/validator.js');

exports.validateNotification = function(req, res, next) {
  validator.validate('notification', Notification, req, res, next);
};

exports.findNotificationById = function(req, res, next, id) {
  Notification.get(req.params.userId, id, function(err, notification) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(notification)) {
      next({code: 404, message: 'Notification with id ' + id + ' not found.'});
    } else {
      req.notification = notification;
      next();
    }
  });
};

exports.readAllNotifications = function(req, res, next) {
  Notification.getAll(req.params.userId, function(err, notifications) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(notifications)) {
      next({code: 404, message: 'Notifications not found.'});
    } else {
      res.jsonp(200, notifications);
    }
  });
};

exports.readNotification = function(req, res, next) {
  if(!req.notification) {
    next({code: 404, message: 'Notification not found.'});
  } else {
    res.jsonp(200, req.notification);
  }
};

exports.createNotification = function(req, res, next) {
  Notification.create(req.params.userId, req.body, function(err, notification) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(201, notification);
    }
  });
};

exports.updateNotification = function(req, res, next) {
  Notification.update(req.body, function(err, notification) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(200, notification);
    }
  });
};
