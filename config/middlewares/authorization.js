'use strict';

var admins = require('../../app/controllers/admins');
/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.jsonp(401, 'User is not authorized');
  }
  next();
};

exports.admin = {
  hasAuthorization: function(req, res, next) {
    if(admins.isAdmin(req.user)) {
      next();
    } else {
      res.jsonp(401, {message: 'User is not an admin'});
    }
  }
};
