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
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(notification)) {
      res.jsonp(404, {message: 'Notification with id ' + id + ' not found.'});
    } else {
      req.notification = notification;
      next();
    }
  });
};

exports.readAllNotifications = function(req, res) {
  Notification.getAll(req.params.userId, function(err, notifications) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(notifications)) {
      res.jsonp(404, {message: 'Notifications not found.'});
    } else {
      res.jsonp(200, notifications);
    }
  });
};

exports.readNotification = function(req, res) {
  if(!req.notification) {
    res.jsonp(404, {message: 'Notification not found.'});
  } else {
    res.jsonp(200, req.notification);
  }
};

exports.createNotification = function(req, res) {
  Notification.create(req.params.userId, req.body, function(err, notification) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(201, notification);
    }
  });
};

exports.updateNotification = function(req, res) {
  Notification.update(req.body, function(err, notification) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, notification);
    }
  });
};
