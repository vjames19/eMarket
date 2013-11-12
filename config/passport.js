'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');
var Admin = require('../app/models/admin.js');

var _ = require('underscore');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    if(Admin.isAdmin(user)) {
      done(null, {id: user.id, role: 'admin'});
    } else {
      done(null, {id: user.id, role: 'user'});
    }
  });

  passport.deserializeUser(function(user, done) {
    if(user.role === 'admin') {
      Admin.get(user.id, function(err, admin) {
        if(_.isEmpty(admin)) {
          done(null, false);
        } else {
          done(null, admin);
        }
      });
    } else {
      User.get(user.id, function(err, user) {
        if(_.isEmpty(user)) {
          done(null, false);
        } else {
          done(null, user);
        }
      });
    }
  });

  passport.use('user', new LocalStrategy({usernameField: 'username', passwordField: 'password'},
      function(username, password, done) {
        User.authenticate(username, password, function(err, user) {
          console.log('Local User Strategy', arguments);
          if(err) {
            done(err, false);
          } else if(_.isEmpty(user)) {
            done(null, false);
          } else {
            done(null, user);
          }
        });
      }));

  passport.use('admin', new LocalStrategy({usernameField: 'username', passwordField: 'password'},
      function(username, password, done) {
        Admin.authenticate(username, password, function(err, admin) {
          console.log('Local Admin Strategy', arguments);
          if(err) {
            done(err);
          } else if(_.isEmpty(admin)) {
            done(null, false);
          } else {
            done(null, admin);
          }
        });
      }));
};
