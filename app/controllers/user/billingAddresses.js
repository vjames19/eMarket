'use strict';

var _ = require('underscore');
var BillingAddresses = require('../../models/billingAddress.js');

exports.findBillAddressById = function(req, res, next, id) {
  BillingAddresses.get(req.params.userId, id, function(err, billingAddress) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(billingAddress)) {
      res.jsonp(404, {message: 'Billing Address with id ' + id + ' not found.'});
    } else {
      req.billAddress = billingAddress;
      next();
    }
  });
};

exports.readAllBillAddresses = function(req, res) {
  BillingAddresses.getAll(req.params.userId, function(err, billingAddresses) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(billingAddresses)) {
      res.jsonp(404, {message: 'Billing Addresses not found.'});
    } else {
      res.jsonp(200, billingAddresses);
    }
  });
};

exports.readBillAddress = function(req, res) {
  if(!req.billAddress) {
    res.jsonp(404, {message: 'Billing Address not found.'});
  } else {
    res.jsonp(200, req.billAddress);
  }
};

exports.createBillAddress = function(req, res) {
  BillingAddresses.create(req.body, req.params.userId, function(err, billAddress) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(201, billAddress);
    }
  });
};

exports.updateBillAddress = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteBillAddress = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
