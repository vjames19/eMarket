'use strict';

var _ = require('underscore');
var BrowsedItems = require('../../models/recentlyViewed.js');

exports.findBrowsedItemById = function(req, res, next, id) {
  BrowsedItems.get(req.params.userId, id, function(err, browsedItem) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(browsedItem)) {
      res.jsonp(404, {message: 'Browsed Item with id ' + id + ' not found.'});
    } else {
      req.browsedItem = browsedItem;
      next();
    }
  });
};

exports.readAllBrowsedItems = function(req, res) {
  BrowsedItems.getAll(req.params.userId, function(err, browsedItems) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(browsedItems)) {
      res.jsonp(404, {message: 'Browsed Items not found.'});
    } else {
      res.jsonp(200, browsedItems);
    }
  });
};

exports.readBrowsedItem = function(req, res) {
  if(!req.browsedItem) {
    res.jsonp(404, {message: 'Browsed Item not found.'});
  } else {
    res.jsonp(200, req.browsedItem);
  }
};

exports.createBrowsedItem = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateBrowsedItem = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteBrowsedItem = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
