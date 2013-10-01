'use strict';

var _ = require('underscore');

var users = {
  1: {
    userID: 1,
    userFirstName: 'Chencho',
    userMiddleName: 'Mata',
    userLastName: 'Vaca',
    userTelephone: '787-459-6285'
  },
  2: {
    userID: 2,
    userFirstName: 'Mariano',
    userMiddleName: null,
    userLastName: 'Sol',
    userTelephone: '787-415-4952'
  }
};


exports.findUserByID = function(req, res, next, id) {
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
  user.userID = _.keys(users).length + 1;
  users[user.userID] = user;
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
  users[req.user.userID] = req.user;
  res.jsonp(req.user);
};

/**
 * Delete a user
 */
exports.deleteUser = function(req, res) {
  delete users[req.user.userID];
  res.jsonp(req.user);
};


///**
// * Module dependencies.
// */
//var mongoose = require('mongoose'),
//    User = mongoose.model('User');
//
///**
// * Auth callback
// */
//exports.authCallback = function(req, res, next) {
//  res.redirect('/');
//};
//
///**
// * Show login form
// */
//exports.signin = function(req, res) {
//  res.render('users/signin', {
//    title: 'Signin',
//    message: req.flash('error')
//  });
//};
//
///**
// * Show sign up form
// */
//exports.signup = function(req, res) {
//  res.render('users/signup', {
//    title: 'Sign up',
//    user: new User()
//  });
//};
//
///**
// * Logout
// */
//exports.signout = function(req, res) {
//  req.logout();
//  res.redirect('/');
//};
//
///**
// * Session
// */
//exports.session = function(req, res) {
//  res.redirect('/');
//};
//
///**
// * Create user
// */
//exports.create = function(req, res) {
//  var user = new User(req.body);
//
//  user.provider = 'local';
//  user.save(function(err) {
//    if(err) {
//      return res.render('users/signup', {
//        errors: err.errors,
//        user: user
//      });
//    }
//    req.logIn(user, function(err) {
//      if(err) {
//        return next(err);
//      }
//      return res.redirect('/');
//    });
//  });
//};
//
///**
// *  Show profile
// */
//exports.show = function(req, res) {
//  var user = req.profile;
//
//  res.render('users/show', {
//    title: user.name,
//    user: user
//  });
//};
//
///**
// * Send User
// */
//exports.me = function(req, res) {
//  res.jsonp(req.user || null);
//};
//
///**
// * Find user by id
// */
//exports.user = function(req, res, next, id) {
//  User
//      .findOne({
//        _id: id
//      })
//      .exec(function(err, user) {
//        if(err) {
//          return next(err);
//        }
//        if(!user) {
//          return next(new Error('Failed to load User ' + id));
//        }
//        req.profile = user;
//        next();
//      });
//};
