'use strict';

var _ = require('underscore');
var CreditCards = require('../../models/creditCard.js');

// Credit Cards
var creditCards = {
  1: {
    creditCardId: 1,
    creditCardName: 'Apu',
    creditCardType: 'Visa',
    creditCardExpDate: '07/07/2018',
    creditCardNumber: 1234567887654321,
    creditCardCvs: 123,
    creditCardBillingAddressId: 1
  },
  2: {
    creditCardId: 2,
    creditCardName: 'Amy',
    creditCardType: 'MasterCard',
    creditCardExpDate: '09/09/2028',
    creditCardNumber: 8765567843211234,
    creditCardCvs: 7890,
    creditCardBillingAddressId: 2
  },
  3: {
    creditCardId: 3,
    creditCardName: 'Gil',
    creditCardType: 'AmericanExpress',
    creditCardExpDate: '11/11/2038',
    creditCardNumber: 8172635445362718,
    creditCardCvs: 4567,
    creditCardBillingAddressId: 3
  }
};

exports.findCreditCardById = function(req, res, next, id) {
  CreditCards.get(req.params.userId, id, function(err, creditCard) {
    if(_.isEmpty(creditCard)) {
      res.jsonp(404, {message: 'Credit Card with id ' + id + ' not found'});
    }
    else {
      req.creditCard = creditCard;
      next();
    }
  });
};

exports.readAllCreditCards = function(req, res) {
  CreditCards.getAll(req.params.userId, function(err, creditCards) {
    res.jsonp(creditCards);
  });
};

exports.createCreditCard = function(req, res) {
  var creditCard = req.body;
  creditCard.creditCardId = _.keys(creditCards).length + 1;
  creditCards[creditCard.creditCardId] = creditCard;
  res.jsonp(creditCard);
};

exports.readCreditCard = function(req, res) {
  res.jsonp(req.creditCard);
};

exports.updateCreditCard = function(req, res) {
  _.extend(req.creditCard, req.body);
  creditCards[req.creditCard.creditCardId] = req.creditCard;
  res.jsonp(req.creditCard);
};

exports.deleteCreditCard = function(req, res) {
  delete creditCards[req.creditCard.creditCardId];
  res.jsonp(req.creditCard);
};
