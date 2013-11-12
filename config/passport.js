'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');
var Admin = require('../app/models/admin.js');

var _ = require('underscore');

var authUser = false;
var authAdmin = false;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    if(authUser) {
//      console.log('Serializing User');
      done(null, user.id);
    }
    if(authAdmin) {
//      console.log('Serializing Admin');
      done(null, user.id);
    }
  });

  passport.deserializeUser(function(id, done) {
    if(authUser) {
//      console.log('Deserializing User');
      User.get(id, function(err, user) {
        if(_.isEmpty(user)) {
          done(null, false);
        } else {
          done(null, user);
        }
      });
    }
    if(authAdmin) {
//      console.log('Deserializing Admin');
      Admin.get(id, function(err, admin) {
        if(_.isEmpty(admin)) {
          done(null, false);
        } else {
          done(null, admin);
        }
      });
    }
  });

  passport.use('user', new LocalStrategy({usernameField: 'username', passwordField: 'password'},
      function(username, password, done) {
        authUser = true;
        authAdmin = false;
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
        authUser = false;
        authAdmin = true;
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
