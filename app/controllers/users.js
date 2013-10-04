'use strict';

var _ = require('underscore');

var users = {
  1: {
    userId: 1,
    userFirstName: 'Chencho',
    userMiddleName: 'Mata',
    userLastName: 'Vaca',
    userTelephone: '787-459-6285'
  },
  2: {
    userId: 2,
    userFirstName: 'Mariano',
    userMiddleName: null,
    userLastName: 'Sol',
    userTelephone: '787-415-4952'
  }
};


exports.findUserById = function(req, res, next, id) {
  if(!users[+id]) {
    res.jsonp(404, {message: 'User not found'});
  } else {
    req.user = users[+id];
    next();
  }
};

/**
 * List of users
 */
exports.readAllUsers = function(req, res) {
  res.jsonp(_.values(users));
};

/**
 * Create a user
 */
exports.createUser = function(req, res) {
  var user = req.body;
  user.userId = _.keys(users).length + 1;
  users[user.userId] = user;
  res.jsonp(user);
};

/**
 * Read a user
 */
exports.readUser = function(req, res) {
  res.jsonp(req.user);
};

/**
 * Update a user
 */
exports.updateUser = function(req, res) {
  _.extend(req.user, req.body);
  users[req.user.userId] = req.user;
  res.jsonp(req.user);
};

/**
 * Delete a user
 */
exports.deleteUser = function(req, res) {
  delete users[req.user.userId];
  res.jsonp(req.user);
};

// Drafts
var drafts = {
  1: {
    draftId: 1,
    userId: 1,
    specId: 1
  },
  2: {
    draftId: 2,
    userId: 2,
    specId: 2
  }
};

exports.findDraftById = function(req, res, next, id) {
  if(!drafts[+id]) {
    res.jsonp(404, {message:'Draft not found'});
  } else {
    req.draft = drafts[+id];
    next();
  }
};

exports.readAllDrafts = function(req, res) {
  res.jsonp(_.values(drafts));
};

exports.createDraft = function(req, res) {
  var draft = req.body;
  draft.draftId = _.keys(drafts).length + 1;
  drafts[draft.draftId] = draft;
  res.jsonp(draft);
};

exports.readDraft = function(req, res) {
  res.jsonp(req.draft);
};

exports.updateDraft = function(req, res) {
  _.extend(req.draft, req.body);
  drafts[req.draft.draftId] = req.draft;
  res.jsonp(req.draft);
};

exports.deleteDraft = function(req, res) {
  delete drafts[req.draft.draftId];
  res.jsonp(req.draft);
};

// Invoices
var invoices = {
  1: {
    invoiceId: 1,
    products: {
      1: {
        productId: 1,
        userId: 1,
        quantity: 2
      },
      2: {
        productId: 2,
        userId: 1,
        quantity: 4
      }
    },
    date: "10-10-2013",
    paymentTypeId: 54504155454,
    paymentType: "Card"

  },
  2: {
    invoiceId: 2,
    products: {
      1: {
        productId: 2,
        userId: 2,
        quantity: 17
      }
    },
    date: "09-12-2013",
    paymentTypeId: 45487899454,
    paymentType: "Bank"
  }
};

exports.findInvoiceById = function(req, res, next, id) {
  if(!invoices[+id]) {
    res.jsonp(404, {message:'Invoice not found'});
  } else {
    req.invoice = invoices[+id];
    next();
  }
};

exports.readAllInvoices = function(req, res) {
  res.jsonp(_.values(invoices));
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

// Mail Addresses
var mailAddresses = {
  1: {
    mailAddressId: 1,
    userId: 1,
    mailAddress: "Urb. Mata La Vaca, Cuchillo Street",
    city: "Camuy",
    country: "Puerto Rico",
    geographicalRegion: null,
    zipcode: "00746",
    recipientName: "Tesla Quiles",
    telephone: "787-458-6156",
    paymentTypeId: 54504155454,
    paymentType: "Card"
  },
  2: {
    mailAddressId: 2,
    userId: 1,
    mailAddress: "Urb. Pollo Mojao, Pechuga Street",
    city: "Mayaguez",
    country: "Puerto Rico",
    geographicalRegion: null,
    zipcode: "05946",
    recipientName: "Juan del Pueblo",
    telephone: "787-458-1226",
    paymentTypeId: 44564155454,
    paymentType: "Bank"
  },
  3: {
    mailAddressId: 3,
    userId: 2,
    mailAddress: "Barrio Palmas, Calle Perla",
    city: "New York",
    country: "United States",
    geographicalRegion: null,
    zipcode: "00956",
    recipientName: "John the People",
    telephone: "412-458-3246",
    paymentTypeId: 54504155454,
    paymentType: "Card"
  }
};

exports.findMailAddressById = function(req, res, next, id) {
  if(!mailAddresses[+id]) {
    res.jsonp(404, {message: 'Mail Address Not Found'});
  } else {
    req.mailAddress = mailAddresses[+id];
    next();
  }
};

exports.readAllMailAddresses = function(req, res) {
  res.jsonp(_.values(mailAddresses));
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


