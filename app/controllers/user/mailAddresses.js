'use strict';

var _ = require('underscore');
var MailingAddresses = require('../../models/mailingAddress.js');

exports.findMailAddressById = function(req, res, next, id) {
  MailingAddresses.get(req.params.userId, id, function(err, mailingAddress) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(mailingAddress)) {
      res.jsonp(404, {message: 'Mailing Address with id ' + id + ' not found.'});
    } else {
      req.mailAddress = mailingAddress;
      next();
    }
  });
};

exports.readAllMailAddresses = function(req, res) {
  MailingAddresses.getAll(req.params.userId, function(err, mailingAddresses) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(mailingAddresses)) {
      res.jsonp(404, {message: 'Mailing Addresses not found.'});
    } else {
      res.jsonp(200, mailingAddresses);
    }
  });
};

exports.readMailAddress = function(req, res) {
  if(!req.mailAddress) {
    res.jsonp(404, {message: 'Mailing Address not found.'});
  } else {
    res.jsonp(200, req.mailAddress);
  }
};

exports.createMailAddress = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateMailAddress = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteMailAddress = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
