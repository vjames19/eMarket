'use strict';

var _ = require('underscore');

var products = {
  1: {
    productId: 1,
    productSeller: 1,
    category: 'books',
    productName: 'harry potter',
    buyItNowPrice: 100,
    startingBidPrice: 80
  },
  2: {
    productId: 2,
    productSeller: 2,
    category: 'cars',
    productName: '3 potes',
    buyItNowPrice: 1000,
    startingBidPrice: 500
  }
};

exports.findProductById = function(req, res, next, id) {
  console.log('id', id);
  if(!products[+id]) {
    res.jsonp(404, {message: 'product not found'});
  } else {
    req.product = products[+id];
    next();
  }
};

exports.readAllProducts = function(req, res) {
  res.jsonp(_.values(products));
};

exports.createProduct = function(req, res)  {
  var product = req.body;
  product.productId = _.keys(products).length + 1;
  products[product.productId] = product;
  res.jsonp(product);
};

exports.readProduct = function(req, res) {
  res.jsonp(req.product);
};

exports.updateProduct = function(req, res) {
  _.extend(req.product, req.body);
  products[req.product.productId] = req.product;
  res.jsonp(req.product);
};

exports.deleteProduct = function(req, res) {
  delete products[req.product.productId];
  res.jsonp(req.product);
};

// Bid methods
var bids = {
  1: {
    bidId: 1,
    bidderId: 1,
    productId: 1,
    bidAmount: 100
  }
};

exports.findProductBidById = function(req, res, next, id) {
  id = +id;
  if(!bids[id]) {
    res.jsonp(404, {message: 'not found'});
  } else {
    req.bid = bids[id];
    next();
  }
};

exports.readAllProductBids = function(req, res) {
  res.jsonp(_.values(bids));
};

exports.createProductBid = function(req, res)  {
  var bid = req.body;
  bid.bidId = _.keys(bids).length + 1;
  bids[bid.bidId] = bid;
  res.jsonp(bid);
};

exports.readProductBid = function(req, res) {
  res.jsonp(req.bid);
};

exports.updateProductBid = function(req, res) {
  _.extend(req.bid, req.body);
  bids[req.bid.bidId] = req.bid;
  res.jsonp(req.bid);
};

exports.deleteProductBid = function(req, res) {
  delete bids[req.bid.bidId];
  res.jsonp(req.bid);
};
