'use strict';

var LocalStrategy = require('passport-local').Strategy,
    config = require('./config');
// TODO: Require the user model here.

module.exports = function(passport) {
  // TODO: Serialize sessions
  var user = {
    username: 'user',
    password: 'password',
    id: 1
  };

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    if(user.id = id) {
      done(null, user);
    } else {
      done('exploto como siqui', null);
    }
  });

  //Use local strategy
  passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
      },
      function(username, password, done) {
        if(username === 'user' && password === 'password') {
          done(null, user);
        } else {
          done('exploto como siqui', null);
        }
      }
  ));
};
