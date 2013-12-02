'use strict';

var _ = require('underscore');
var BankAccounts = require('../../models/bankAccount.js');

// Bank Accounts
var bankAccounts = {
  1: {
    bankId: 1,
    bankName: 'SamBanks',
    bankAccountName: 'Apu',
    bankAccountType: 'Checking',
    bankAccountNumber: 123456789,
    bankAccountRouting: 123456789,
    bankBillingAddressId: 1
  },
  2: {
    bankId: 2,
    bankName: 'EduBanks',
    bankAccountName: 'Amy',
    bankAccountType: 'Savings',
    bankAccountNumber: 12345678909876543,
    bankAccountRouting: 987654321,
    bankBillingAddressId: 2
  },
  3: {
    bankId: 3,
    bankName: 'VicBanks',
    bankAccountName: 'Gil',
    bankAccountType: 'Growth',
    bankAccountNumber: 1029384756758,
    bankAccountRouting: 192834756,
    bankBillingAddressId: 3
  }
};

exports.findBankAccountById = function(req, res, next, id) {
  BankAccounts.get(req.params.userId, id, function(err, bankAccount) {
    if(err) {
      res.jsonp(500, err);
    } else if(_.isEmpty(bankAccount)) {
      res.jsonp(404, {message: 'Bank Account with id ' + id + ' not found'});
    } else {
      req.bankAccount = bankAccount;
      next();
    }
  });
};

exports.readAllBankAccounts = function(req, res) {
  BankAccounts.getAll(req.params.userId, function(err, bankAccounts) {
    if(err) {
      res.jsonp(500, err);
    } else if (_.isEmpty(bankAccounts)) {
      res.jsonp(404, {message: 'Credit Cards not found'});
    } else {
      res.jsonp(bankAccounts);
    }
  });

};

exports.createBankAccount = function(req, res) {
  BankAccounts.create(req.body, req.params.userId, function(err, bankAccount) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(201, bankAccount);
    }
  });
};

exports.readBankAccount = function(req, res) {
  res.jsonp(req.bankAccount);
};

exports.updateBankAccount = function(req, res) {
  BankAccounts.update(req.body, req.params.userId, function(err, bankAccount) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(200, bankAccount);
    }
  });
};

exports.deleteBankAccount = function(req, res) {
  delete bankAccounts[req.bankAccount.bankId];
  res.jsonp(req.bankAccount);
};
