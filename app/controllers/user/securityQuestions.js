'use strict';

var _ = require('underscore');
var Questions = require('../../models/question.js');
var QuestionsAnswers = require('../../models/questionAnswer.js');

// Security Questions

exports.findQuestionById = function(req, res, next, id) {
  Questions.get(id, function(err, question) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(question)) {
      res.jsonp(404, {message: 'Question with id ' + id + ' not found.'});
    } else {
      req.question = question;
      next();
    }
  });
};

exports.readAllQuestions = function(req, res) {
  Questions.getAll(function(err, questionsAnswers) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(questionsAnswers)) {
      res.jsonp(404, {message: 'Questions not found.'});
    } else {
      res.jsonp(200, questionsAnswers);
    }
  });
};

exports.readQuestion = function(req, res) {
  if(!req.question) {
    res.jsonp(404, {message: 'Question not found.'});
  } else {
    res.jsonp(200, req.question);
  }
};

exports.createQuestion = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateQuestion = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteQuestion = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

// Security Questions Answers

exports.findQuestionAnswerById = function(req, res, next, id) {
  QuestionsAnswers.get(req.params.userId, id, function(err, questionAnswer) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(questionAnswer)) {
      res.jsonp(404, {message: 'Answer with id ' + id + ' not found.'});
    } else {
      req.questionAnswer = questionAnswer;
      next();
    }
  });
};

exports.readAllQuestionsAnswers = function(req, res) {
  QuestionsAnswers.getAll(req.params.userId, function(err, questionsAnswers) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(questionsAnswers)) {
      res.jsonp(404, {message: 'Answers not found.'});
    } else {
      res.jsonp(200, questionsAnswers);
    }
  });
};

exports.readQuestionAnswer = function(req, res) {
  if(!req.questionAnswer) {
    res.jsonp(404, {message: 'Answer not found.'});
  } else {
    res.jsonp(200, req.questionAnswer);
  }
};

exports.createQuestionAnswer = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateQuestionAnswer = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteQuestionAnswer = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
