'use strict';

var _ = require('underscore');
var Invoices = require('../../models/invoice.js');

exports.findInvoiceById = function(req, res, next, id) {
  Invoices.get(req.params.userId, id, function(err, invoice) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(invoice)) {
      res.jsonp(404, {message: 'Invoice with id ' + id + ' not found.'});
    } else {
      req.invoice = invoice;
      next();
    }
  });
};

exports.readAllInvoices = function(req, res) {
  Invoices.getAll(req.params.userId, function(err, invoices) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(invoices)) {
      res.jsonp(404, {message: 'Invoices not found.'});
    } else {
      res.jsonp(200, invoices);
    }
  });
};

exports.readInvoice = function(req, res) {
  if(!req.invoice) {
    res.jsonp(404, {message: 'Invoice not found.'});
  } else {
    res.jsonp(200, req.invoice);
  }
};

exports.createInvoice = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateInvoice = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteInvoice = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

// Invoice Items

exports.readAllProductsInvoice = function(req, res) {
  Invoices.getProducts(req.params.userId, req.params.invoiceId, function(err, products) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(products)) {
      res.jsonp(404, {message: 'Invoice Products not found.'});
    } else {
      res.jsonp(200, products);
    }
  });
};
