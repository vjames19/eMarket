'use strict';

var _ = require('underscore');
var Product = require('../models/product.js');
var ProductBids = require('../models/productBids.js');

exports.findProductById = function(req, res, next, id) {
  Product.get(id, function(err, product) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(product)) {
      next({code: 404, message: 'Product with id ' + id + ' not found.'});
    } else {
      req.product = product;
      next();
    }
  });
};

exports.readAllProducts = function(req, res, next) {
  Product.getAll(function(err, products) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(products)) {
      next({code: 404, message: 'Products not found.'});
    } else {
      res.jsonp(200, products);
    }
  });
};

exports.readProduct = function(req, res, next) {
  if(!req.product) {
    next({code: 404, message: 'Product not found.'});
  } else {
    res.jsonp(200, req.product);
  }
};

exports.createProduct = function(req, res, next) {
  Product.create(req.body, req.user.id, function(err, product) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(201, product);
    }
  });
};

exports.updateProduct = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteProduct = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.findProductBidById = function(req, res, next, id) {
  ProductBids.get(req.params.productId, id, function(err, productBid) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(productBid)) {
      next({code: 404, message: 'Product Bid with id ' + id + ' not found.'});
    } else {
      req.productBid = productBid;
      next();
    }
  });
};

exports.readAllProductBids = function(req, res, next) {
  ProductBids.getAll(req.params.productId, function(err, productBids) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(productBids)) {
      next({code: 404, message: 'Product Bids not found.'});
    } else {
      res.jsonp(200, productBids);
    }
  });
};

exports.readProductBid = function(req, res, next) {
  if(!req.productBid) {
    next({code: 404, message: 'Product Bid not found.'});
  } else {
    res.jsonp(200, req.productBid);
  }
};

exports.createProductBid = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.updateProductBid = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteProductBid = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};
