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

    app.use(function errorHandler(err, req, res, next) {
      console.log('error handlder');
      if(err.hasOwnProperty("code")) {
        console.log(err);
        res.jsonp(err.code, err);
      } else { // 404
        return next();
      }
    });

    app.use(function notFound(req, res) { // no middleware responded :(
      res.jsonp(404, {message: "Resource not found"});
    });
  });
};
