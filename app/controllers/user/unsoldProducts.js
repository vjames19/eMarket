'use strict';

var _ = require('underscore');
var UnsoldProducts = require('../../models/unsoldProduct.js');

exports.findUnsoldProductById = function(req, res, next, id) {
  UnsoldProducts.get(req.params.userId, id, function(err, unsoldProduct) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(unsoldProduct)) {
      res.jsonp(404, {message: 'Unsold Product with id ' + id + ' not found.'});
    } else {
      req.unsoldProduct = unsoldProduct;
      next();
    }
  });
};

exports.readAllUnsoldProducts = function(req, res) {
  UnsoldProducts.getAll(req.params.userId, function(err, unsoldProducts) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(unsoldProducts)) {
      res.jsonp(404, {message: 'Unsold Products not found.'});
    } else {
      res.jsonp(200, unsoldProducts);
    }
  });
};

exports.readUnsoldProduct = function(req, res) {
  if(!req.unsoldProduct) {
    res.jsonp(404, {message: 'Unsold Product not found.'});
  } else {
    res.jsonp(200, req.unsoldProduct);
  }
};

exports.createUnsoldProduct = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateUnsoldProduct = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteUnsoldProduct = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
