'use strict';

var _ = require('underscore');
var Invoices = require('../../models/invoice.js');

// Invoices
var invoices = {
  1: {
    invoiceId: 1,
    invoiceNumber: 454505,
    products: {
      1: {
        productId: 1,
        productName: 'alienware',
        productQuantity: 2
      },
      2: {
        productId: 2,
        productName: 'dell',
        productQuantity: 4
      }
    },
    orderPrice: 6560.00,
    date: '10-10-2013',
    paymentTypeId: 54504155454,
    paymentType: 'Card'
  },
  2: {
    invoiceId: 2,
    invoiceNumber: 989262,
    products: {
      1: {
        productId: 1,
        productName: 'pig',
        productQuantity: 8
      },
      2: {
        productId: 2,
        productName: 'dog',
        productQuantity: 3
      }
    },
    orderPrice: 877.99,
    date: '11-29-2013',
    paymentTypeId: 454151554,
    paymentType: 'Bank'
  }
};

exports.findInvoiceById = function(req, res, next, id) {
  Invoices.get(req.params.userId, id, function(err, invoice) {
    if(_.isEmpty(invoice)) {
      res.jsonp(404, {message: 'Invoice with id ' + id + ' not found'});
    } else {
      req.invoice = invoice;
      next();
    }
  });
};

exports.readAllInvoices = function(req, res) {
  Invoices.getAll(req.params.userId, function(err, invoices) {
    res.jsonp(invoices);
  });

};

exports.createInvoice = function(req, res) {
  var invoice = req.body;
  invoice.invoiceId = _.keys(invoices).length + 1;
  invoices[invoice.invoiceId] = invoice;
  res.jsonp(invoice);
};

exports.readInvoice = function(req, res) {
  res.jsonp(req.invoice);
};

exports.updateInvoice = function(req, res) {
  _.extend(req.invoice, req.body);
  invoices[req.invoice.invoiceId] = req.invoice;
  res.jsonp(req.invoice);
};

exports.deleteInvoice = function(req, res) {
  delete invoices[req.invoice.invoiceId];
  res.jsonp(req.invoice);
};

exports.readAllProductsInvoice = function(req, res) {
  Invoices.getProducts(req.params.userId, req.params.invoiceId, function(err, products) {
    res.jsonp(products);
  });
};
