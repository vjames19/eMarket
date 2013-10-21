'use strict';

var _ = require('underscore');
var Product = require('../models/product.js');

var products = {
  1: {
    productId: 1,
    productSellerId: 1,
    productCategory: 'books',
    productName: 'harry potter',
    productBuyItNowPrice: 100,
    productStartingBidPrice: 80,
    productCurrentBidPrice: 89,
    productBidEndDate: '07/07/2007',
    productShippingPrice: 18.99,
    productQuantity: 5,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/1/z98how.png',
      productBrand: 'pearson',
      productModel: 'IBN:19238476',
      productDimensions: '30x29x49'
    }
  },
  2: {
    productId: 2,
    productSellerId: 9,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 1000.99,
    productStartingBidPrice: 500.99,
    productCurrentBidPrice: 800.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantity: 3,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    }
  }
};

exports.findProductById = function(req, res, next, id) {
  Product.get(id, function(err, product) {
    if(_.isEmpty(product)) {
      res.jsonp(404, {message: 'Product with id ' + id + ' not found'});
    } else {
      req.product = product;
      next();
    }
  });
};

exports.readAllProducts = function(req, res) {
  Product.getAll(function(err, products) {
    res.jsonp(products);
  });
};

exports.createProduct = function(req, res) {
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
    bidProductId: 1,
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

exports.createProductBid = function(req, res) {
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
