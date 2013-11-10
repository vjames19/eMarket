'use strict';

var _ = require('underscore');
var ShoppingCarts = require('../../models/shoppingCart.js');

// Carts
var carts = {
  1: {
    cartId: 1,
    userId: 1,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 599.99,
    productStartingBidPrice: 500.99,
    productCurrentBidPrice: 800.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 5.99,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    quantity: 2,
    cost: 1199.99
  },
  2: {
    cartId: 2,
    userId: 1,
    productCategory: 'computers',
    productName: 'dell',
    productBuyItNowPrice: 16.99,
    productStartingBidPrice: 5.99,
    productCurrentBidPrice: 8.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    quantity: 4,
    cost: 99.99
  }
};

exports.findCartById = function(req, res, next, id) {
  ShoppingCarts.get(req.params.userId, id, function(err, shoppingCart) {
    if(_.isEmpty(shoppingCart)) {
      res.jsonp(404, {message: 'Shopping Cart with id ' + id + ' not found'});
    }
    else {
      req.cart = shoppingCart;
      next();
    }
  });
};

exports.readAllCarts = function(req, res) {
  ShoppingCarts.getAll(req.params.userId, function(err, carts) {
    res.jsonp(carts);
  });
};

exports.createCart = function(req, res) {
  var cart = req.body;
  cart.cartId = _.keys(carts).length + 1;
  carts[cart.cartId] = cart;
  res.jsonp(cart);
};

exports.readCart = function(req, res) {
  res.jsonp(req.cart);
};

exports.updateCart = function(req, res) {
  _.extend(req.cart, req.body);
  carts[req.cart.cartId] = req.cart;
  res.jsonp(req.cart);
};

exports.deleteCart = function(req, res) {
  delete carts[req.cart.cartId];
  res.jsonp(req.cart);
};
