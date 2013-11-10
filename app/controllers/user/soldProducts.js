'use strict';

var _ = require('underscore');
var SoldProducts = require('../../models/soldProduct.js');

// Sold Products
var soldProducts = {
  1: {
    productId: 1,
    productSellerId: 1,
    productCategory: 'books',
    productName: 'harry potter',
    productBuyItNowPrice: 100,
    productStartingBidPrice: 80,
    productBidEndDate: '07/07/2007',
    productShippingPrice: 18.99,
    productQuantitySold: 5,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/1/z98how.png',
      productBrand: 'pearson',
      productModel: 'IBN:19238476',
      productDimensions: '30x29x49'
    },
    productSoldDate: '07/06/2007'
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
    productQuantitySold: 3,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    productSoldDate: '07/06/2008'
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
    productQuantitySold: 9,
    productDescription: {
      productCondition: 'User',
      productPicture: '/img/products/users/403/z89kik.png',
      productBrand: 'AmericanEagle',
      productModel: 'K99',
      productDimensions: '10x20x30'
    },
    productSoldDate: '07/06/2009'
  }
};

exports.findSoldProductById = function(req, res, next, id) {
  SoldProducts.get(req.params.userId, id, function(err, soldProduct) {
    if(_.isEmpty(soldProduct)) {
      res.jsonp(404, {message: 'Sold Product with id ' + id + ' not found'});
    } else {
      req.soldProduct = soldProduct;
      next();
    }
  });

};

exports.readAllSoldProducts = function(req, res) {
  SoldProducts.getAll(req.params.userId, function(err, soldProducts) {
    res.jsonp(soldProducts);
  });
};

exports.createSoldProduct = function(req, res) {
  var soldProduct = req.body;
  soldProduct.productId = _.keys(soldProducts).length + 1;
  soldProducts[soldProduct.productId] = soldProduct;
  res.jsonp(soldProduct);
};

exports.readSoldProduct = function(req, res) {
  res.jsonp(req.soldProduct);
};

exports.updateSoldProduct = function(req, res) {
  _.extend(req.soldProduct, req.body);
  soldProducts[req.soldProduct.productId] = req.soldProduct;
  res.jsonp(req.soldProduct);
};

exports.deleteSoldProduct = function(req, res) {
  delete soldProducts[req.soldProduct.productId];
  res.jsonp(req.soldProduct);
};
