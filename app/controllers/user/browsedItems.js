'use strict';

var _ = require('underscore');
var BrowsedItems = require('../../models/recentlyViewed.js');

exports.findBrowsedItemById = function(req, res, next, id) {
  BrowsedItems.get(req.params.userId, id, function(err, browsedItem) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(browsedItem)) {
      next({code: 404, message: 'Browsed Item with id ' + id + ' not found.'});
    } else {
      req.browsedItem = browsedItem;
      next();
    }
  });
};

exports.readAllBrowsedItems = function(req, res, next) {
  BrowsedItems.getAll(req.params.userId, function(err, browsedItems) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(browsedItems)) {
      next({code: 404, message: 'Browsed Items not found.'});
    } else {
      res.jsonp(200, browsedItems);
    }
  });
};

exports.readBrowsedItem = function(req, res, next) {
  if(!req.browsedItem) {
    next({code: 404, message: 'Browsed Item not found.'});
  } else {
    res.jsonp(200, req.browsedItem);
  }
};

exports.createBrowsedItem = function(req, res, next) {
  BrowsedItems.create(req.params.userId, req.body, function(err, recentlyViewed) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(201, recentlyViewed);
    }
  });
};

exports.updateBrowsedItem = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteBrowsedItem = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};
