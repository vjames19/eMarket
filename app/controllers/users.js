'use strict';

var _ = require('underscore');
var Users = require('../models/user.js');
var Register = require('../models/register.js');

var nestedControllersPath = __dirname + '/user';
require('fs').readdirSync(nestedControllersPath).forEach(function(file) {
  _.extend(exports, require(nestedControllersPath + '/' + file));
});

var users = {
  1: {
    id: 1,
    userId: 1,
    username: 'chencho_mata',
    userFirstName: 'Chencho',
    userMiddleName: 'Mata',
    userLastName: 'Vaca',
    userEmail: 'chencho.vaca@upr.edu',
    userTelephone: '787-459-6285',
    userPassword: '123',
    questions: {
      1: {
        'dog': 'blacki'
      },
      2: {
        'cat': 'lola'
      },
      3: {
        'fish': 'nemo'
      }
    }
  },
  2: {
    id: 2,
    userId: 2,
    username: 'mariano_sol',
    userFirstName: 'Mariano',
    userMiddleName: null,
    userLastName: 'Sol',
    userEmail: 'mariano.sol@upr.edu',
    userTelephone: '787-415-4952',
    userPassword: '456',
    questions: {
      1: {
        'dog': 'blacki'
      },
      2: {
        'cat': 'lola'
      },
      3: {
        'fish': 'nemo'
      }
    }
  }
};

exports.findUserById = function(req, res, next, id) {
  Users.get(id, function(err, user) {
    if(_.isEmpty(user)) {
      res.jsonp(404, {message: 'User with id ' + id + ' not found'});
    } else {
      req.requestedUser = user;
      next();
    }
  });
};

/**
 * List of users
 */
exports.readAllUsers = function(req, res) {
  Users.getAll(function(err, users) {
    res.jsonp(users);
  });
};

/**
 * Change user Password
 */
exports.changeUserPassword = function(req, res) {
  Users.changePassword(req.body, function(err, forgotInfo) {
    if(err) {
      res.jsonp(500, err);
    } else if(forgotInfo === null) {
      res.jsonp(404, 'Information not Found');
    } else {
      res.jsonp(201, forgotInfo);
    }
  });
};

/**
 * Create a user
 */
exports.createUser = function(req, res) {
  Register.create(req.body, function(err, registration) {
    if(err) {
      res.jsonp(500, err);
    }
    else if(registration === null) {
      res.jsonp(409, 'Username or Email Already Exists.');
    }
    else {
      res.jsonp(201, registration);
    }
  });
};
//exports.createUser = function(req, res) {
//  var user = req.body;
//  user.id = user.userId = _.keys(users).length + 1;
//  users[user.userId] = user;
//  res.jsonp(user);
//};

/**
 * Read a user
 */
exports.readUser = function(req, res) {
  res.jsonp(req.requestedUser);
};

/**
 * Update a user
 */
exports.updateUser = function(req, res) {
  _.extend(req.requestedUser, req.body);
  users[req.requestedUser.userId] = req.requestedUser;
  res.jsonp(req.requestedUser);
};

/**
 * Delete a user
 */
exports.deleteUser = function(req, res) {
  delete users[req.requestedUser.userId];
  res.jsonp(req.requestedUser);
};
