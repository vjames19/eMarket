'use strict';

var _ = require('underscore');
var MailingAddresses = require('../../models/mailingAddress.js');

// Mail Addresses
var mailAddresses = {
  1: {
    mailAddressId: 1,
    userId: 1,
    mailAddress: 'Urb. Mata La Vaca, Cuchillo Street',
    city: 'Camuy',
    country: 'Puerto Rico',
    geographicalRegion: 'N/A',
    zipCode: '00746',
    recipientName: 'Tesla Quiles',
    telephone: '787-458-6156',
    isPrimary: true
  },
  2: {
    mailAddressId: 2,
    userId: 1,
    mailAddress: 'Urb. Pollo Mojao, Pechuga Street',
    city: 'Mayaguez',
    country: 'Puerto Rico',
    geographicalRegion: 'N/A',
    zipCode: '05946',
    recipientName: 'Juan del Pueblo',
    telephone: '787-458-1226',
    isPrimary: false

  },
  3: {
    mailAddressId: 3,
    userId: 2,
    mailAddress: 'Barrio Palmas, Calle Perla',
    city: 'New York City',
    country: 'United States',
    geographicalRegion: 'New York',
    zipCode: '00956',
    recipientName: 'John the People',
    telephone: '412-458-3246',
    isPrimary: false
  }
};

exports.findMailAddressById = function(req, res, next, id) {
  MailingAddresses.get(req.params.userId, id, function(err, mailingAddress) {
    if(_.isEmpty(mailingAddress)) {
      res.jsonp(404, {message: 'Mailing Address with id ' + id + ' not found'});
    } else {
      req.mailAddress = mailingAddress;
      next();
    }
  });
};

exports.readAllMailAddresses = function(req, res) {
  MailingAddresses.getAll(req.params.userId, function(err, mailingAddresses) {
    res.jsonp(mailingAddresses);
  });
};

exports.createMailAddress = function(req, res) {
  var mailAddress = req.body;
  mailAddress.mailAddressId = _.keys(mailAddresses).length + 1;
  mailAddresses[mailAddress.mailAddressId] = mailAddress;
  res.jsonp(mailAddress);
};

exports.readMailAddress = function(req, res) {
  res.jsonp(req.mailAddress);
};

exports.updateMailAddress = function(req, res) {
  _.extend(req.mailAddress, req.body);
  mailAddresses[req.mailAddress.mailAddressId] = req.mailAddress;
  res.jsonp(req.mailAddress);
};

exports.deleteMailAddress = function(req, res) {
  delete mailAddresses[req.mailAddress.mailAddressId];
  res.jsonp(req.mailAddress);
};
