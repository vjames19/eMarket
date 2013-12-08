'use strict';

var _ = require('underscore');
var Questions = require('../../models/question.js');
var QuestionsAnswers = require('../../models/questionAnswer.js');

// Security Questions

exports.findQuestionById = function(req, res, next, id) {
  Questions.get(id, function(err, question) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(question)) {
      next({code: 404, message: 'Question with id ' + id + ' not found.'});
    } else {
      req.question = question;
      next();
    }
  });
};

exports.readAllQuestions = function(req, res, next) {
  Questions.getAll(function(err, questionsAnswers) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(questionsAnswers)) {
      next({code: 404, message: 'Questions not found.'});
    } else {
      res.jsonp(200, questionsAnswers);
    }
  });
};

exports.readQuestion = function(req, res, next) {
  if(!req.question) {
    next({code: 404, message: 'Question not found.'});
  } else {
    res.jsonp(200, req.question);
  }
};

exports.createQuestion = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.updateQuestion = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteQuestion = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

// Security Questions Answers

exports.findQuestionAnswerById = function(req, res, next, id) {
  QuestionsAnswers.get(req.params.userId, id, function(err, questionAnswer) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(questionAnswer)) {
      next({code: 404, message: 'Answer with id ' + id + ' not found.'});
    } else {
      req.questionAnswer = questionAnswer;
      next();
    }
  });
};

exports.readAllQuestionsAnswers = function(req, res, next) {
  QuestionsAnswers.getAll(req.params.userId, function(err, questionsAnswers) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(questionsAnswers)) {
      next({code: 404, message: 'Answers not found.'});
    } else {
      res.jsonp(200, questionsAnswers);
    }
  });
};

exports.readQuestionAnswer = function(req, res, next) {
  if(!req.questionAnswer) {
    next({code: 404, message: 'Answer not found.'});
  } else {
    res.jsonp(200, req.questionAnswer);
  }
};

exports.createQuestionAnswer = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.updateQuestionAnswer = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteQuestionAnswer = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};
