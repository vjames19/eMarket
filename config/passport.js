'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');
var _ = require('underscore');
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.get(id, function(err, user) {
      if(_.isEmpty(user)) {
        done(null, false)
      } else {
        done(null, user);
      }
    });
  });

  //Use local strategy
  passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},
      function(username, password, done) {
        User.authenticate(username, password, function(err, user) {
          if(err) {
            done(err);
          } else {
            done(null, user);
          }
        });
      }));
};
