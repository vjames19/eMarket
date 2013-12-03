'use strict';

var _ = require('underscore');
var BankAccounts = require('../../models/bankAccount.js');

exports.findBankAccountById = function(req, res, next, id) {
  BankAccounts.get(req.params.userId, id, function(err, bankAccount) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(bankAccount)) {
      res.jsonp(404, {message: 'Bank Account with id ' + id + ' not found.'});
    } else {
      req.bankAccount = bankAccount;
      next();
    }
  });
};

exports.readAllBankAccounts = function(req, res) {
  BankAccounts.getAll(req.params.userId, function(err, bankAccounts) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(bankAccounts)) {
      res.jsonp(404, {message: 'Banks not found.'});
    } else {
      res.jsonp(200, bankAccounts);
    }
  });
};

exports.readBankAccount = function(req, res) {
  if(!req.bankAccount) {
    res.jsonp(404, {message: 'Bank not found.'});
  } else {
    res.jsonp(200, req.bankAccount);
  }
};

exports.createBankAccount = function(req, res) {
  BankAccounts.create(req.body, req.params.userId, function(err, bankAccount) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(201, bankAccount);
    }
  });
};

exports.updateBankAccount = function(req, res) {
  BankAccounts.update(req.body, req.params.userId, function(err, bankAccount) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, bankAccount);
    }
  });
};

exports.deleteBankAccount = function(req, res) {
  BankAccounts.remove(req.bankAccount, function(err, bankAccount) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, bankAccount);
    }
  });
};
