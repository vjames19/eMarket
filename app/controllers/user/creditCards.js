'use strict';

var _ = require('underscore');
var CreditCards = require('../../models/creditCard.js');

exports.findCreditCardById = function(req, res, next, id) {
  CreditCards.get(req.params.userId, id, function(err, creditCard) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(creditCard)) {
      next({code: 404, message: 'Credit Card with id ' + id + ' not found.'});
    } else {
      req.creditCard = creditCard;
      next();
    }
  });
};

exports.readAllCreditCards = function(req, res, next) {
  CreditCards.getAll(req.params.userId, function(err, creditCards) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(creditCards)) {
      next({code: 404, message: 'Credit Cards not found.'});
    }
    else {
      res.jsonp(200, creditCards);
    }
  });
};

exports.readCreditCard = function(req, res, next) {
  if(!req.creditCard) {
    next({code: 404, message: 'Credit Card not found.'});
  } else {
    res.jsonp(200, req.creditCard);
  }
};

exports.createCreditCard = function(req, res, next) {
  console.log(req.body);
  CreditCards.create(req.body, req.params.userId, function(err, creditCard) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(201, creditCard);
    }
  });
};

exports.updateCreditCard = function(req, res, next) {
  console.log(req.body);
  CreditCards.update(req.body, req.params.userId, function(err, creditCard) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(200, creditCard);
    }
  });
};

exports.deleteCreditCard = function(req, res, next) {
  CreditCards.remove(req.creditCard, req.params.userId, function(err, creditCard) {
    if(err) {
      next({code: 500, message: err});
    } else if(creditCard === null) {
      next({code: 409, message: 'Cannot Delete Last Credit Card.'});
    } else {
      res.jsonp(200, creditCard);
    }
  });
};
