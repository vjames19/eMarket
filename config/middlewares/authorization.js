'use strict';

var admins = require('../../app/models/admin');

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
  console.log("requires login");
  if(req.isAuthenticated() || process.env.NODE_ENV === "development") {
    next();
  } else {
    next({code: 401, message: 'User needs to be logged in.'});
  }
};

exports.hasSameUserId = function(req, res, next) {
  if(req.hasOwnProperty('user') && (req.user.id == req.params.userId)) {
    next();
  } else {
    next({code: 403, message: 'Forbidden to access anothers user\'s resources.'});
  }
};

exports.admin = {
  hasAuthorization: function(req, res, next) {
    if(admins.isAdmin(req.user)) {
      next();
    } else {
      next({code: 403, message: 'User ' + req.user.username + ' is not an Administrator.'});
    }
  }
};
