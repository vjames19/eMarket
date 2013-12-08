'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    path = require('path'),
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
  app.use(express.static(path.join(config.root, 'public')));

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
      if(err.hasOwnProperty('code')) {
        console.log(err);
        res.jsonp(err.code, err);
      } else { // 404
        next();
      }
    });

    app.use(function notFound(req, res) { // no middleware responded :(
      res.status(404);
      // respond with json
      if(req.accepts('json') && req.url.substring(0, 5) === '/api/') {
        res.send({code: 404, message: 'Resource not found.'});
        return;
      }
      // respond with html page
      if(req.accepts('html')) {
        res.sendfile(path.join(config.root, 'public', '404.html'));
        return;
      }
      // respond with text if default
      res.type('txt').send('Resource Not found.');
    });

  });
};
