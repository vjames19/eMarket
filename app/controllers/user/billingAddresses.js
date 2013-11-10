'use strict';

var _ = require('underscore');
var BillingAddresses = require('../../models/billingAddress.js');

// Bill Addresses
var billAddresses = {
  1: {
    billAddressId: 1,
    userId: 1,
    billAddress: 'Urb. Mata La Vaca, Cuchillo Street',
    city: 'Camuy',
    country: 'Puerto Rico',
    geographicalRegion: 'N/A',
    zipCode: '00746',
    recipientName: 'Tesla Quiles',
    telephone: '787-458-6156',
    paymentTypeId: 54504155454,
    paymentType: 'Card'
  },
  2: {
    billAddressId: 2,
    userId: 1,
    billAddress: 'Urb. Pollo Mojao, Pechuga Street',
    city: 'Mayaguez',
    country: 'Puerto Rico',
    geographicalRegion: 'N/A',
    zipCode: '05946',
    recipientName: 'Juan del Pueblo',
    telephone: '787-458-1226',
    paymentTypeId: 44564155454,
    paymentType: 'Bank'
  },
  3: {
    billAddressId: 3,
    userId: 2,
    billAddress: 'Barrio Palmas, Calle Perla',
    city: 'Manhattan',
    country: 'United States',
    geographicalRegion: 'New York',
    zipCode: '00956',
    recipientName: 'John the People',
    telephone: '412-458-3246',
    paymentTypeId: 54504155454,
    paymentType: 'Card'
  }
};

exports.findBillAddressById = function(req, res, next, id) {
  BillingAddresses.get(req.params.userId, id, function(err, billingAddress) {
    if(_.isEmpty(billingAddress)) {
      res.jsonp(404, {message: 'Billing Address with id ' + id + ' not found'});
    }
    else {
      req.billAddress = billingAddress;
      next();
    }
  });
};

exports.readAllBillAddresses = function(req, res) {
  BillingAddresses.getAll(req.params.userId, function(err, billingAddresses) {
    res.jsonp(billingAddresses);
  });
};

exports.createBillAddress = function(req, res) {
  var billAddress = req.body;
  billAddress.billAddressId = _.keys(billAddresses).length + 1;
  billAddresses[billAddress.billAddressId] = billAddress;
  res.jsonp(billAddress);
};

exports.readBillAddress = function(req, res) {
  res.jsonp(req.billAddress);
};

exports.updateBillAddress = function(req, res) {
  _.extend(req.billAddress, req.body);
  billAddresses[req.billAddress.billAddressId] = req.billAddress;
  res.jsonp(req.billAddress);
};

exports.deleteBillAddress = function(req, res) {
  delete billAddresses[req.billAddress.billAddressId];
  res.jsonp(req.billAddress);
};
