'use strict';

var admins = require('../../app/models/admin');
/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.jsonp(401, {message: 'User needs to be logged in'});
  }
};

exports.admin = {
  hasAuthorization: function(req, res, next) {
    if(admins.isAdmin(req.user)) {
      next();
    } else {
      res.jsonp(403, {message: req.user + ' is not an Administrator'});
    }
  }
};
