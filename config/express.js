'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    config = require('./config');

module.exports = function(app, passport) {
  app.set('showStackError', true);

  //Should be placed before express.static
  app.use(express.compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  //Setting the fav icon and static folder
  app.use(express.favicon());
  app.use(express.static(config.root + '/public'));

  //Don't use logger for test env
  if(process.env.NODE_ENV !== 'test') {
    app.use(express.logger('dev'));
  }

  //Enable jsonp
  app.enable('jsonp callback');

  app.configure(function() {
    //bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    //cookieParser should be above session
    app.use(express.cookieParser());
    app.use(express.session({secret: 'eMarket'}));
    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    //routes should be at the last
    app.use(app.router);

    app.use(function(err, req, res, next) {
      // Authentication failed
      if(err.message && err.message.indexOf('Authentication') >= 0) {
        console.log('in dsnfksdfna');
        res.jsonp(401, err);
      } else if(err.message && ~err.message.indexOf('not found')) { //Treat as 404
        res.jsonp(404, 'Not found');
      } else {
        //Log it
        console.error(err.stack);
        //Error page
        res.jsonp(500, {error: err.stack});
      }
    });

  });
};
