'use strict';

var _ = require('underscore');
var Invoices = require('../../models/invoice.js');

exports.findInvoiceById = function(req, res, next, id) {
  Invoices.get(req.params.userId, id, function(err, invoice) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(invoice)) {
      next({code: 404, message: 'Invoice with id ' + id + ' not found.'});
    } else {
      req.invoice = invoice;
      next();
    }
  });
};

exports.readAllInvoices = function(req, res, next) {
  Invoices.getAll(req.params.userId, function(err, invoices) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(invoices)) {
      next({code: 404, message: 'Invoices not found.'});
    } else {
      res.jsonp(200, invoices);
    }
  });
};

exports.readInvoice = function(req, res, next) {
  if(!req.invoice) {
    next({code: 404, message: 'Invoice not found.'});
  } else {
    res.jsonp(200, req.invoice);
  }
};

exports.createInvoice = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.updateInvoice = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteInvoice = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

// Invoice Items

exports.readAllProductsInvoice = function(req, res, next) {
  Invoices.getProducts(req.params.userId, req.params.invoiceId, function(err, products) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(products)) {
      next({code: 404, message: 'Invoice Products not found.'});
    } else {
      res.jsonp(200, products);
    }
  });
};
