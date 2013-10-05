'use strict';

var LocalStrategy = require('passport-local').Strategy;//,
//    config = require('./config');
// TODO: Require the user model here.

module.exports = function(passport) {
  // TODO: Serialize sessions
  var users = {
    'user': {
      username: 'user',
      password: 'password',
      id: 1
    },
    'admin': {
      username: 'admin',
      password: 'password',
      id: 0
    }
  };

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    if(users[username]) {
      done(null, users[username]);
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
        var user = users[username];
        if(user && user.password === password) {
          done(null, user);
        } else {
          done({message: 'Authentication: Incorrect user or password'}, null);
        }
      }
  ));
};
