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
    if(_.isEmpty(bankAccount)) {
      res.jsonp(404, {message: 'Bank Account with id ' + id + ' not found'});
    }
    else {
      req.bankAccount = bankAccount;
      next();
    }
  });
};

exports.readAllBankAccounts = function(req, res) {
  BankAccounts.getAll(req.params.userId, function(err, bankAccounts) {
    res.jsonp(bankAccounts);
  });

};

exports.createBankAccount = function(req, res) {
  var bankAccount = req.body;
  bankAccount.bankId = _.keys(bankAccounts).length + 1;
  bankAccounts[bankAccount.bankId] = bankAccount;
  res.jsonp(bankAccount);
};

exports.readBankAccount = function(req, res) {
  res.jsonp(req.bankAccount);
};

exports.updateBankAccount = function(req, res) {
  _.extend(req.bankAccount, req.body);
  bankAccounts[req.bankAccount.bankId] = req.bankAccount;
  res.jsonp(req.bankAccount);
};

exports.deleteBankAccount = function(req, res) {
  delete bankAccounts[req.bankAccount.bankId];
  res.jsonp(req.bankAccount);
};
