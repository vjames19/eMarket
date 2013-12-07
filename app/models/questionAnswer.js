'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

var DICTIONARY = {
  'question_id': 'id',
  'question_content': 'question',
  'answer_id': 'answerId',
  'answer_content': 'answer'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT question_history.*, question_answer_history.* ' +
          'FROM active_users INNER JOIN question_answer_history INNER JOIN question_history ' +
          'ON (user_id = answer_user_id AND answer_question_id = question_id) ' +
          'WHERE user_id = ? AND answer_status = 1';
      connection.query(sql, [userId], function(err, securityQuestions) {
        logger.logQuery('questionAnswer_getAll:', this.sql);
        callback(err, mapper.mapCollection(securityQuestions, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, questionId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT question_history.*, question_answer_history.* ' +
          'FROM active_users INNER JOIN question_answer_history INNER JOIN question_history ' +
          'ON (user_id = answer_user_id AND answer_question_id = question_id) ' +
          'WHERE user_id = ? AND answer_status = 1 AND question_id = ?';
      connection.query(sql, [userId, questionId], function(err, securityQuestion) {
        logger.logQuery('questionAnswer_get:', this.sql);
        callback(err, mapper.map(securityQuestion[0], DICTIONARY));
      });
    }
  });
};
