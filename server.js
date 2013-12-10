'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    mysql = require('mysql'),
    passport = require('passport'),
    path = require('path');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

  // Load configurations
  // if test env, load example file
  //var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  //    config = require('./config/config'),
  //    auth = require('./config/middlewares/authorization');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.LOG_QUERIES = process.env.LOG_QUERIES || 'true';

var config = require('./config/config'),
    auth = require('./config/middlewares/authorization');

// Create connection pools;
var pool = mysql.createPool(config.db);
var executor = require('./app/queryexecutor')(pool);

// Bootstrap models
var modelsPath = path.join(__dirname, 'app/models');
fs.readdirSync(modelsPath).forEach(function(file) {
  require(modelsPath + '/' + file).init(executor);
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
console.log('Express App started on port ' + port);

//expose app
exports = module.exports = app;

//var callback = function() {
//  console.log(arguments);
//};
//setInterval(function updateBidEndDate() {
//  executor.execute(function(err, connection) {
//    if(err) {
//      callback(err);
//    } else {
//      var updateBidEndDate =
//    }
//  });
//}, 1000);
