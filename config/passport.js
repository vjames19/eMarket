'use strict';

var LocalStrategy = require('passport-local').Strategy,
    config = require('./config');
// TODO: Require the user model here.

module.exports = function(passport) {
  // TODO: Serialize sessions
  //  passport.serializeUser(function(user, done) {
  //    done(null, user.id);
  //  });
  //
  //  passport.deserializeUser(function(id, done) {
  //    User.findOne({
  //      _id: id
  //    }, function(err, user) {
  //      done(err, user);
  //    });
  //  });

  //Use local strategy
  passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
        User.findOne({
          email: email
        }, function(err, user) {
          if(err) {
            return done(err);
          }
          if(!user) {
            return done(null, false, {
              message: 'Unknown user'
            });
          }
          if(!user.authenticate(password)) {
            return done(null, false, {
              message: 'Invalid password'
            });
          }
          return done(null, user);
        });
      }
  ));
};
