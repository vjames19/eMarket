'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

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
    var sql = 'SELECT * ' +
              'FROM question_history ' +
              'ORDER BY question_id';
    connection.query(sql, function(err, questions) {
      if(err) {
        callback(err);
      } else {
        questions = _.map(questions, function(question) {
          return mapper.map(question, DICTIONARY);
        });
        callback(null, questions);
      }
    });
  });
};

module.exports.get = function(questionId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * ' +
              'FROM question_history ' +
              'WHERE question_id = ?';
    connection.query(sql, [questionId], function(err, question) {
      callback(err, mapper.map(question[0], DICTIONARY));
    });
  });
};



