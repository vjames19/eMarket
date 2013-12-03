'use strict';

var _ = require('underscore');
var Product = require('../models/product.js');
var ProductBids = require('../models/productBids.js');

exports.findProductById = function(req, res, next, id) {
  Product.get(id, function(err, product) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(product)) {
      res.jsonp(404, {message: 'Product with id ' + id + ' not found.'});
    } else {
      req.product = product;
      next();
    }
  });
};

exports.readAllProducts = function(req, res) {
  Product.getAll(function(err, products) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(products)) {
      res.jsonp(404, {message: 'Products not found.'});
    } else {
      res.jsonp(200, products);
    }
  });
};

exports.readProduct = function(req, res) {
  if(!req.product) {
    res.jsonp(404, {message: 'Product not found.'});
  } else {
    res.jsonp(200, req.product);
  }
};

exports.createProduct = function(req, res) {
  Product.create(req.body, req.user.id, function(err, product) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(201, product);
    }
  });
};

exports.updateProduct = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteProduct = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.findProductBidById = function(req, res, next, id) {
  ProductBids.get(req.params.productId, id, function(err, productBid) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(productBid)) {
      res.jsonp(404, {message: 'Product Bid with id ' + id + ' not found.'});
    } else {
      req.productBid = productBid;
      next();
    }
  });
};

exports.readAllProductBids = function(req, res) {
  ProductBids.getAll(req.params.productId, function(err, productBids) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(productBids)) {
      res.jsonp(404, {message: 'Product Bids not found.'});
    } else {
      res.jsonp(200, productBids);
    }
  });
};

exports.readProductBid = function(req, res) {
  if(!req.productBid) {
    res.jsonp(404, {message: 'Product Bid not found.'});
  } else {
    res.jsonp(200, req.productBid);
  }
};

exports.createProductBid = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateProductBid = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteProductBid = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
