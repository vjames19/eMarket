'use strict';

var _ = require('underscore');
var Questions = require('../../models/question.js');
var QuestionsAnswers = require('../../models/questionAnswer.js');

var questions = [
  {
    'id': 1,
    'question': 'What was your childhood nickname?'
  },
  {
    'id': 2,
    'question': 'What is the name of your favorite childhood friend?'
  },
  {
    'id': 3,
    'question': 'Where were you when you had your first kiss?'
  },
  {
    'id': 4,
    'question': 'In what city does your nearest sibling live?'
  },
  {
    'id': 5,
    'question': 'What is your maternal grandmother\'s maiden name?'
  },
  {
    'id': 6,
    'question': 'In what city or town was your first job?'
  },
  {
    'id': 7,
    'question': 'What was your dream job as a child?'
  },
  {
    'id': 8,
    'question': 'What is the name of the company of your first job?'
  },
  {
    'id': 9,
    'question': 'Who was your childhood hero?'
  }
];

// Security Questions
exports.findQuestionById = function(req, res, next, id) {
  Questions.get(id, function(err, question) {
    if(_.isEmpty(question)) {
      res.jsonp(404, {message: 'Question with id ' + id + ' not found'});
    } else {
      req.question = question;
      next();
    }
  });
};

/**
 * List of questions and answers
 */
exports.readAllQuestions = function(req, res) {
  Questions.getAll(function(err, questionsAnswers) {
    res.jsonp(questionsAnswers);
  });
};

/**
 * Create a a question with answer
 */
exports.createQuestion = function(req, res) {
  var question = req.body;
  question.id = _.keys(questions).length + 1;
  questions[question.id] = question;
  res.jsonp(question);
};

/**
 * Read a question and answer
 */
exports.readQuestion = function(req, res) {
  res.jsonp(req.question);
};

/**
 * Update a question and answer
 */
exports.updateQuestion = function(req, res) {
  _.extend(req.question, req.body);
  questions[req.question.id] = req.question;
  res.jsonp(req.question);
};

/**
 * Delete a question and answer
 */
exports.deleteQuestion = function(req, res) {
  delete questions[req.question.id];
  res.jsonp(req.question);
};

var questionAnswers = {
  1: {
    questionAnswerId: 1,
    questionContent: 'What was your childhood nickname?',
    questionUserId: 1,
    questionAnswerContent: 'Julian',
    questionAnswerStatus: true
  },
  2: {
    questionAnswerId: 2,
    questionContent: 'What is the name of your favorite childhood friend?',
    questionUserId: 1,
    questionAnswerContent: 'Josian',
    questionAnswerStatus: true
  },
  3: {
    questionAnswerId: 3,
    questionContent: 'Where were you when you had your first kiss?',
    questionUserId: 1,
    questionAnswerContent: 'Guavate',
    questionAnswerStatus: true
  }
};

// Security Questions and Answers
exports.findQuestionAnswerById = function(req, res, next, id) {
  QuestionsAnswers.get(req.params.userId, id, function(err, questionAnswer) {
    if(_.isEmpty(questionAnswer)) {
      res.jsonp(404, {message: 'Question and Answer with id ' + id + ' not found'});
    } else {
      req.questionAnswer = questionAnswer;
      next();
    }
  });
};

/**
 * List of questions and answers
 */
exports.readAllQuestionsAnswers = function(req, res) {
  QuestionsAnswers.getAll(req.params.userId, function(err, questionsAnswers) {
    res.jsonp(questionsAnswers);
  });
};

/**
 * Create a a question with answer
 */
exports.createQuestionAnswer = function(req, res) {
  var questionAnswer = req.body;
  questionAnswer.questionAnswerId = _.keys(questionAnswer).length + 1;
  questionAnswers[questionAnswer.questionAnswerId] = questionAnswer;
  res.jsonp(questionAnswer);
};

/**
 * Read a question and answer
 */
exports.readQuestionAnswer = function(req, res) {
  res.jsonp(req.questionAnswer);
};

/**
 * Update a question and answer
 */
exports.updateQuestionAnswer = function(req, res) {
  _.extend(req.questionAnswer, req.body);
  questionAnswers[req.questionAnswer.questionAnswerId] = req.questionAnswer;
  res.jsonp(req.questionAnswer);
};

/**
 * Delete a question and answer
 */
exports.deleteQuestionAnswer = function(req, res) {
  delete questionAnswers[req.questionAnswer.questionAnswerId];
  res.jsonp(req.questionAnswer);
};
