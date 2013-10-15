'use strict';

var admins = require('../../app/controllers/admins');
/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.jsonp(401, 'User is not authorized');
  }
};

exports.admin = {
  hasAuthorization: function(req, res, next) {
    if(admins.isAdmin(req.user)) {
      next();
    } else {
      res.jsonp(401, {message: req.user.username + ' is not an Administrator'});
    }
  }
};
