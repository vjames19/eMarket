'use strict';

var _ = require('underscore');
var ShoppingCarts = require('../../models/shoppingCart.js');

exports.findCartById = function(req, res, next, id) {
  ShoppingCarts.get(req.params.userId, id, function(err, cartItem) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(cartItem)) {
      res.jsonp(404, {message: 'Shopping Cart with id ' + id + ' not found.'});
    } else {
      req.cart = cartItem;
      next();
    }
  });
};

exports.readAll = function(req, res) {
  ShoppingCarts.getAll(req.params.userId, function(err, cartItems) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(cartItems)) {
      res.jsonp(404, {message: 'Shopping cartItems not found.'});
    } else {
      res.jsonp(200, cartItems);
    }
  });
};

exports.readCart = function(req, res) {
  if(!req.cart) {
    res.jsonp(404, {message: 'Shopping Cart not found.'});
  } else {
    res.jsonp(200, req.cart);
  }
};

exports.createCart = function(req, res, next) {
 ShoppingCarts.create(req.body, req.params.userId, function(err, cartItem) {
   if(err) {
     return next({message: err, code: 500});
   } else {
     res.jsonp(201, cartItem);
   }
 });
};

exports.updateCart = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteCart = function(req, res, next) {
  ShoppingCarts.remove(req.cart, function(err, cartItem) {
    if(err) {
      return next({message: err, code: 500});
    } else {
      res.jsonp(200, cartItem);
    }
  });
};

