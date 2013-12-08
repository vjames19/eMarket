'use strict';

var _ = require('underscore');
var MailingAddresses = require('../../models/mailingAddress.js');

exports.findMailAddressById = function(req, res, next, id) {
  MailingAddresses.get(req.params.userId, id, function(err, mailingAddress) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(mailingAddress)) {
      next({code: 404, message: 'Mailing Address with id ' + id + ' not found.'});
    } else {
      req.mailAddress = mailingAddress;
      next();
    }
  });
};

exports.readAllMailAddresses = function(req, res, next) {
  MailingAddresses.getAll(req.params.userId, function(err, mailingAddresses) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(mailingAddresses)) {
      next({code: 404, message: 'Mailing Addresses not found.'});
    } else {
      res.jsonp(200, mailingAddresses);
    }
  });
};

exports.readMailAddress = function(req, res, next) {
  if(!req.mailAddress) {
    next({code: 404, message: 'Mailing Address not found.'});
  } else {
    res.jsonp(200, req.mailAddress);
  }
};

exports.createMailAddress = function(req, res, next) {
  MailingAddresses.create(req.body, req.params.userId, function(err, mailingAddress) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(201, mailingAddress);
    }
  });
};

exports.updateMailAddress = function(req, res, next) {
  MailingAddresses.update(req.body, req.params.userId, function(err, mailingAddress) {
    if(err) {
      next({code: 500, message: err});
    } else if(mailingAddress === null) {
      next({code: 409, message: 'Cannot remove only primary address.'});
    } else {
      res.jsonp(200, mailingAddress);
    }
  });
};

exports.deleteMailAddress = function(req, res, next) {
  MailingAddresses.remove(req.mailAddress, function(err, mailingAddress) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(200, mailingAddress);
    }
  });
};
