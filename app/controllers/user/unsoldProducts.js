'use strict';

var _ = require('underscore');
var UnsoldProducts = require('../../models/unsoldProduct.js');

exports.findUnsoldProductById = function(req, res, next, id) {
  UnsoldProducts.get(req.params.userId, id, function(err, unsoldProduct) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(unsoldProduct)) {
      next({code: 404, message: 'Unsold Product with id ' + id + ' not found.'});
    } else {
      req.unsoldProduct = unsoldProduct;
      next();
    }
  });
};

exports.readAllUnsoldProducts = function(req, res, next) {
  UnsoldProducts.getAll(req.params.userId, function(err, unsoldProducts) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(unsoldProducts)) {
      next({code: 404, message: 'Unsold Products not found.'});
    } else {
      res.jsonp(200, unsoldProducts);
    }
  });
};

exports.readUnsoldProduct = function(req, res, next) {
  if(!req.unsoldProduct) {
    next({code: 404, message: 'Unsold Product not found.'});
  } else {
    res.jsonp(200, req.unsoldProduct);
  }
};

exports.createUnsoldProduct = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.updateUnsoldProduct = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteUnsoldProduct = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};
