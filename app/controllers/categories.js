'use strict';

var _ = require('underscore');
var Category = require('../models/category');
var validator = require('./helpers/validator.js');

exports.validate = function(req, res, next) {
  validator.validate('category', Category, req, res, next);
};

exports.findCategoryById = function(req, res, next, id) {
  Category.get(id, function(err, category) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(category)) {
      res.jsonp(404, {message: 'Category with id ' + id + ' not found.'});
    } else {
      req.category = category;
      next();
    }
  });
};

exports.readAll = function(req, res) {
  Category.getAll(function(err, categories) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(categories)) {
      res.jsonp(404, {message: 'Categories not Found.'});
    } else {
      if(req.query.flat === 'true') {
        res.jsonp(200, categories);
      } else {
        _.each(categories, function(category) {
          var sub = _.where(categories, {categoryParent: category.id});
          category.categories = sub.length > 0 ? sub : null;
        });
        res.jsonp(200, _.where(categories, {categoryParent: null}));
      }
    }
  });
};

exports.readCategory = function(req, res) {
  if(!req.category) {
    res.jsonp(404, {message: 'Category not found.'});
  } else {
    res.jsonp(200, req.category);
  }
};

exports.createCategory = function(req, res) {
  Category.create(req.body, function(err, category) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(201, category);
    }
  });
};

exports.updateCategory = function(req, res) {
  Category.update(req.body, function(err, category) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(category);
    }
  });
};

exports.deleteCategory = function(req, res) {
  Category.remove(req.category.id, function(err) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(req.category);
    }
  });
};
