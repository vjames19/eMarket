'use strict';

var _ = require('underscore');
var ShoppingCarts = require('../../models/shoppingCart.js');

exports.findCartById = function(req, res, next, id) {
  ShoppingCarts.get(req.params.userId, id, function(err, shoppingCart) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(shoppingCart)) {
      res.jsonp(404, {message: 'Shopping Cart with id ' + id + ' not found.'});
    } else {
      req.cart = shoppingCart;
      next();
    }
  });
};

exports.readAllCarts = function(req, res) {
  ShoppingCarts.getAll(req.params.userId, function(err, carts) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(carts)) {
      res.jsonp(404, {message: 'Shopping Carts not found.'});
    } else {
      res.jsonp(200, carts);
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

exports.createCart = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateCart = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteCart = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
