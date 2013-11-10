'use strict';

var _ = require('underscore');
var PurchaseHistory = require('../../models/purchasehistory.js');

// Purchases
var purchases = {
  1: {
    purchaseId: 1,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 599.99,
    productStartingBidPrice: 500.99,
    productCurrentBidPrice: 800.99,
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
    productQuantity: 2,
    soldPrice: 1199.99,
    date: '07/30/2013:01:01:01 EST'
  },
  2: {
    purchaseId: 2,
    productCategory: 'computers',
    productName: 'dell',
    productBuyItNowPrice: 16.99,
    productStartingBidPrice: 5.99,
    productCurrentBidPrice: 8.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantitySold: 3,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    productQuantity: 4,
    soldPrice: 99.99,
    date: '07/30/2013:01:01:01 EST'
  }
};

exports.findPurchaseById = function(req, res, next, id) {
  PurchaseHistory.get(req.params.userId, id, function(err, purchase) {
    if(_.isEmpty(purchase)) {
      res.jsonp(404, {message: 'Purchase with id ' + id + ' not found'});
    }
    else {
      req.purchase = purchase;
      next();
    }
  });
};

exports.readAllPurchases = function(req, res) {
  PurchaseHistory.getAll(req.params.userId, function(err, purchases) {
    res.jsonp(purchases);
  });
};

exports.createPurchase = function(req, res) {
  var purchase = req.body;
  purchase.purchaseId = _.keys(purchases).length + 1;
  purchases[purchase.purchaseId] = purchase;
  res.jsonp(purchase);
};

exports.readPurchase = function(req, res) {
  res.jsonp(req.purchase);
};

exports.updatePurchase = function(req, res) {
  _.extend(req.purchase, req.body);
  purchases[req.purchase.purchaseId] = req.purchase;
  res.jsonp(req.purchase);
};

exports.deletePurchase = function(req, res) {
  delete purchases[req.purchase.purchaseId];
  res.jsonp(req.purchase);
};
