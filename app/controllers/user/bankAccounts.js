'use strict';

var _ = require('underscore');
var BankAccounts = require('../../models/bankAccount.js');

exports.findBankAccountById = function(req, res, next, id) {
  BankAccounts.get(req.params.userId, id, function(err, bankAccount) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(bankAccount)) {
      next({code: 404, message: 'Bank Account with id ' + id + ' not found.'});
    } else {
      req.bankAccount = bankAccount;
      next();
    }
  });
};

exports.readAllBankAccounts = function(req, res, next) {
  BankAccounts.getAll(req.params.userId, function(err, bankAccounts) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(bankAccounts)) {
      next({code: 404, message: 'Banks not found.'});
    } else {
      res.jsonp(200, bankAccounts);
    }
  });
};

exports.readBankAccount = function(req, res, next) {
  if(!req.bankAccount) {
    next({code: 404, message: 'Bank not found.'});
  } else {
    res.jsonp(200, req.bankAccount);
  }
};

exports.createBankAccount = function(req, res, next) {
  BankAccounts.create(req.body, req.params.userId, function(err, bankAccount) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(201, bankAccount);
    }
  });
};

exports.updateBankAccount = function(req, res, next) {
  BankAccounts.update(req.body, req.params.userId, function(err, bankAccount) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(200, bankAccount);
    }
  });
};

exports.deleteBankAccount = function(req, res, next) {
  BankAccounts.remove(req.bankAccount, req.params.userId, function(err, bankAccount) {
    if(err) {
      next({code: 500, message: err});
    } else if(bankAccount === null) {
      next({code: 409, message: 'Cannot Delete Last Bank Account.'});
    } else {
      res.jsonp(200, bankAccount);
    }
  });
};
