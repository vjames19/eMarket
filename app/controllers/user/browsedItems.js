'use strict';

var _ = require('underscore');
var BrowsedItems = require('../../models/recentlyViewed.js');

// Broswed Items
var browsedItems =
{
  1: {
    browsedItemId: 1,
    userId: 1,
    productId: 1,
    productSellerId: 2,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 1000.99,
    productStartingBidPrice: 500.99,
    productCurrentBidPrice: 740.00,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantity: 3,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    dateBrowsed: '07/10/2013:14:13:42 EST'
  },
  2: {
    browsedItemId: 2,
    userId: 2,
    productId: 2,
    productSellerId: 1,
    productCategory: 'books',
    productName: 'harry potter',
    productBuyItNowPrice: 100,
    productStartingBidPrice: 80,
    productCurrentBidPrice: 87,
    productBidEndDate: '07/07/2007',
    productShippingPrice: 18.99,
    productQuantity: 5,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/1/z98how.png',
      productBrand: 'pearson',
      productModel: 'IBN:19238476',
      productDimensions: '30x29x49'
    },
    dateBrowsed: '07/30/2013:01:01:01 EST'
  }
};

exports.findBrowsedItemById = function(req, res, next, id) {
  BrowsedItems.get(req.params.userId, id, function(err, browsedItem) {
    if(_.isEmpty(browsedItem)) {
      res.jsonp(404, {message: 'Browsed Item with id ' + id + ' not found'});
    }
    else {
      req.browsedItem = browsedItem;
      next();
    }
  });
};

exports.readAllBrowsedItems = function(req, res) {
  BrowsedItems.getAll(req.params.userId, function(err, browsedItems) {
    res.jsonp(browsedItems);
  });

};

exports.createBrowsedItem = function(req, res) {
  var browsedItem = req.body;
  browsedItem.browsedItemId = _.keys(browsedItems).length + 1;
  browsedItems[browsedItem.browsedItemId] = browsedItem;
  res.jsonp(browsedItem);
};

exports.readBrowsedItem = function(req, res) {
  res.jsonp(req.browsedItem);
};

exports.updateBrowsedItem = function(req, res) {
  _.extend(req.browsedItem, req.body);
  browsedItems[req.browsedItem.browsedItemId] = req.browsedItem;
  res.jsonp(req.browsedItem);
};

exports.deleteBrowsedItem = function(req, res) {
  delete browsedItems[req.browsedItem.browsedItemId];
  res.jsonp(req.browsedItem);
};
