'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization');

// TODO: Bootstrap db connection
// var db = mongoose.connect(config.db);

// Bootstrap models
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function(file) {
  require(modelsPath + '/' + file);
});

// bootstrap passport config
require('./config/passport')(passport);

var app = express();

//express settings
require('./config/express')(app, passport);

//Bootstrap routes
require('./config/routes')(app, passport, auth);

//Start the app by listening on <port>
var port = config.port;
app.listen(port);
console.log('Express app started on port ' + port);

//expose app
exports = module.exports = app;
