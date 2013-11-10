'use strict';

var _ = require('underscore');
var UnsoldProducts = require('../../models/unsoldProduct.js');

// Unsold Products
var unsoldProducts = {
  1: {
    productId: 1,
    productSellerId: 1,
    productCategory: 'books',
    productName: 'harry potter',
    productBuyItNowPrice: 100,
    productStartingBidPrice: 80,
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
  },
  3: {
    productId: 3,
    productSellerId: 403,
    productCategory: 'shirts',
    productName: 'American Eaglo Shirt',
    productBuyItNowPrice: 49.99,
    productStartingBidPrice: 20.99,
    productBidEndDate: '07/07/2009',
    productShippingPrice: 5.99,
    productQuantity: 9,
    productDescription: {
      productCondition: 'User',
      productPicture: '/img/products/users/403/z89kik.png',
      productBrand: 'AmericanEagle',
      productModel: 'K99',
      productDimensions: '10x20x30'
    }
  }
};

exports.findUnsoldProductById = function(req, res, next, id) {
  UnsoldProducts.get(req.params.userId, id, function(err, unsoldProduct) {
    if(_.isEmpty(unsoldProduct)) {
      res.jsonp(404, {message: 'Mailing Address with id ' + id + ' not found'});
    } else {
      req.unsoldProduct = unsoldProduct;
      next();
    }
  });
};

exports.readAllUnsoldProducts = function(req, res) {
  UnsoldProducts.getAll(req.params.userId, function(err, unsoldProducts) {
    res.jsonp(unsoldProducts);
  });
};

exports.createUnsoldProduct = function(req, res) {
  var unsoldProduct = req.body;
  unsoldProduct.unsoldProductId = _.keys(unsoldProducts).length + 1;
  unsoldProducts[unsoldProduct.productId] = unsoldProduct;
  res.jsonp(unsoldProduct);
};

exports.readUnsoldProduct = function(req, res) {
  res.jsonp(req.unsoldProduct);
};

exports.updateUnsoldProduct = function(req, res) {
  _.extend(req.unsoldProduct, req.body);
  unsoldProducts[req.unsoldProduct.productId] = req.unsoldProduct;
  res.jsonp(req.unsoldProduct);
};

exports.deleteUnsoldProduct = function(req, res) {
  delete unsoldProducts[req.unsoldProduct.productId];
  res.jsonp(req.unsoldProduct);
};
