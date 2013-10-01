'use strict';

var _ = require('underscore');

var users = {
  1: {
    userId: 1,
    userFirstName: 'Chencho',
    userMiddleName: 'Mata',
    userLastName: 'Vaca',
    userTelephone: '787-459-6285'
  },
  2: {
    userId: 2,
    userFirstName: 'Mariano',
    userMiddleName: null,
    userLastName: 'Sol',
    userTelephone: '787-415-4952'
  }
};


exports.findUserById = function(req, res, next, id) {
  if(!users[+id]) {
    res.jsonp(404, {message: 'user not found'});
  } else {
    res.user = users[+id];
    next();
  }
};

/**
 * List of users
 */
exports.readAllUsers = function(req, res) {
  res.jsonp(_.values(users));
};

/**
 * Create a user
 */
exports.createUser = function(req, res) {
  var user = req.body;
  user.userId = _.keys(users).length + 1;
  users[user.userId] = user;
  res.jsonp(user);
};

/**
 * Read a user
 */
exports.readUser = function(req, res) {
  res.jsonp(req.user);
};

/**
 * Update a user
 */
exports.updateUser = function(req, res) {
  _.extend(req.user, req.body);
  users[req.user.userId] = req.user;
  res.jsonp(req.user);
};

/**
 * Delete a user
 */
exports.deleteUser = function(req, res) {
  delete users[req.user.userId];
  res.jsonp(req.user);
};
