'use strict';

var _ = require('underscore');
var BillingAddresses = require('../../models/billingAddress.js');

exports.findBillAddressById = function(req, res, next, id) {
  BillingAddresses.get(req.params.userId, id, function(err, billingAddress) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(billingAddress)) {
      next({code: 404, message: 'Billing Address with id ' + id + ' not found.'});
    } else {
      req.billAddress = billingAddress;
      next();
    }
  });
};

exports.readAllBillAddresses = function(req, res, next) {
  BillingAddresses.getAll(req.params.userId, function(err, billingAddresses) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(billingAddresses)) {
      next({code: 404, message: 'Billing Addresses not found.'});
    } else {
      res.jsonp(200, billingAddresses);
    }
  });
};

exports.readBillAddress = function(req, res, next) {
  if(!req.billAddress) {
    next({code: 404, message: 'Billing Address not found.'});
  } else {
    res.jsonp(200, req.billAddress);
  }
};

exports.createBillAddress = function(req, res, next) {
  BillingAddresses.create(req.body, req.params.userId, function(err, billAddress) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(201, billAddress);
    }
  });
};

exports.updateBillAddress = function(req, res, next) {
  BillingAddresses.update(req.body, req.params.userId, function(err, billAddress) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(200, billAddress);
    }
  });
};

exports.deleteBillAddress = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};
