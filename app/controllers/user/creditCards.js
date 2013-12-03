'use strict';

var _ = require('underscore');
var CreditCards = require('../../models/creditCard.js');

exports.findCreditCardById = function(req, res, next, id) {
  CreditCards.get(req.params.userId, id, function(err, creditCard) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(creditCard)) {
      res.jsonp(404, {message: 'Credit Card with id ' + id + ' not found.'});
    } else {
      req.creditCard = creditCard;
      next();
    }
  });
};

exports.readAllCreditCards = function(req, res) {
  CreditCards.getAll(req.params.userId, function(err, creditCards) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(creditCards)) {
      res.jsonp(404, {message: 'Credit Cards not found.'});
    }
    else {
      res.jsonp(200, creditCards);
    }
  });
};

exports.readCreditCard = function(req, res) {
  if(!req.creditCard) {
    res.jsonp(404, {message: 'Credit Card not found.'});
  } else {
    res.jsonp(req.creditCard);
  }
};

exports.createCreditCard = function(req, res) {
  CreditCards.create(req.body, req.params.userId, function(err, creditCard) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(201, creditCard);
    }
  });
};

exports.updateCreditCard = function(req, res) {
  CreditCards.update(req.body, req.params.userId, function(err, creditCard) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, creditCard);
    }
  });
};

exports.deleteCreditCard = function(req, res) {
  CreditCards.remove(req.creditCard, function(err, creditCard) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, creditCard);
    }
  });
};
