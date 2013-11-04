'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'category_id': 'id',
  'category_name': 'name',
  'category_sales': 'sales',
  'category_profit': 'profit',
  'category_revenue': 'revenue'
};

var timeFrames = ['day', 'week', 'month'];

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(timeFrame, callback) {
  executor.execute(function(err, connection) {
    if(!_.contains(timeFrames, timeFrame)) {
      callback(err);
    }
    var sql = 'SELECT * ' +
        'FROM report_' + timeFrame;
    connection.query(sql, function(err, reports) {
      if(err) {
        callback(err);
      } else {
        reports = _.map(reports, function(report) {
          return mapper.map(report, DICTIONARY);
        });
        callback(null, reports);
      }
    });
  });
};

module.exports.get = function(id, timeFrame, callback) {
  executor.execute(function(err, connection) {
    if(!_.contains(timeFrames, timeFrame)) {
      callback(err);
    }
    var sql = 'SELECT * ' +
        'FROM report_' + timeFrame + ' ' +
        'WHERE category_id = ?';
    connection.query(sql, [id], function(err, report) {
      callback(err, mapper.map(report[0], DICTIONARY));
    });
  });
};

module.exports.getTotal = function(timeFrame, callback) {
  executor.execute(function(err, connection) {
    if(!_.contains(timeFrames, timeFrame)) {
      callback(err);
    }
    var sql = 'SELECT NULL as category_id, NULL as category_name, ' +
        'SUM(category_sales) as category_sales, ' +
        'SUM(category_profit) as category_profit, ' +
        'SUM(category_revenue) as category_revenue ' +
        'FROM report_' + timeFrame;
    connection.query(sql, function(err, report) {
      if(err) {
        callback(err);
      } else {
        report = _.map(report, function(reportData) {
          return mapper.map(reportData, DICTIONARY);
        });
        callback(null, report);
      }
    });
  });

};
