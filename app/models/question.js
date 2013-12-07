'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

var DICTIONARY = {
  'question_id': 'id',
  'question_content': 'question'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT * ' +
          'FROM question_history ' +
          'ORDER BY question_id';
      connection.query(sql, function(err, questions) {
        logger.logQuery('questions_getAll:', this.sql);
        callback(err, mapper.mapCollection(questions, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(questionId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT * ' +
          'FROM question_history ' +
          'WHERE question_id = ?';
      connection.query(sql, [questionId], function(err, question) {
        logger.logQuery('questions_get:', this.sql);
        callback(err, mapper.map(question[0], DICTIONARY));
      });
    }
  });
};
