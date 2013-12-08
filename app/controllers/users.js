'use strict';

var _ = require('underscore');
var Users = require('../models/user.js');
var Admins = require('../models/admin.js');

var nestedControllersPath = __dirname + '/user';
require('fs').readdirSync(nestedControllersPath).forEach(function(file) {
  _.extend(exports, require(nestedControllersPath + '/' + file));
});

exports.findUserById = function(req, res, next, id) {
  Users.get(id, function(err, user) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(user)) {
      next({code: 404, message: 'User with id ' + id + ' not found.'});
    } else {
      req.requestedUser = user;
      next();
    }
  });
};

exports.readAllUsers = function(req, res, next) {
  Users.getAll(function(err, users) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(users)) {
      next({code: 404, message: 'Users not found.'});
    } else {
      res.jsonp(200, users);
    }
  });
};

exports.readUser = function(req, res, next) {
  if(!req.requestedUser) {
    next({code: 404, message: 'User not found.'});
  } else {
    res.jsonp(200, req.requestedUser);
  }
};

exports.createUser = function(req, res, next) {
  Users.create(req.body, function(err, registration) {
    if(err) {
      next({code: 500, message: err});
    }
    else if(registration === null) {
      next({code: 409, message: 'Username or Email Already Exists.'});
    }
    else {
      res.jsonp(201, registration);
    }
  });
};

exports.updateUser = function(req, res, next) {
  if(Admins.isAdmin(req.user)) {
    console.log('Admin updating User.');
    Users.update(req.body, true, function(err, user) {
      if(err) {
        next({code: 500, message: err});
      } else if(user === null) {
        next({code: 409, message: 'Old Password is incorrect.'});
      }
      else {
        res.jsonp(200, user);
      }
    });
  } else {
    console.log('User updating Profile.');
    Users.update(req.body, false, function(err, user) {
      if(err) {
        next({code: 500, message: err});
      } else if(user === null) {
        next({code: 409, message: 'Old Password is incorrect.'});
      }
      else {
        res.jsonp(200, user);
      }
    });
  }
};

exports.deleteUser = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

// Change Password

exports.changeUserPassword = function(req, res, next) {
  Users.changePassword(req.body, function(err, forgotInfo) {
    if(err) {
      next({code: 500, message: err});
    } else if(forgotInfo === null) {
      next({code: 404, message: 'Password Information not Found.'});
    } else {
      res.jsonp(201, forgotInfo);
    }
  });
};
