'use strict';

var _ = require('underscore');
var Category = require('../models/category');

exports.findCategoryById = function(req, res, next, id) {
  Category.get(id, function(err, category) {
    if(_.isEmpty(category)) {
      res.jsonp(404, {message: 'Category with id ' + id + ' not found'});
    } else {
      req.category = category;
      next();
    }
  });
};

/**
 * Create a category
 */
exports.createCategory = function(req, res) {
  Category.create(req.body, function(err, category) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(201, category);
    }
  });
};

/**
 * Update a category
 */
exports.updateCategory = function(req, res) {
  var id = req.category.id;
  _.extend(req.category, req.body);
  req.category.id = id;
  Category.update(req.category, function(err, category) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(category);
    }
  });
};

/**
 * Delete a category
 */
exports.deleteCategory = function(req, res) {
  Category.remove(req.category.id, function(err) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(req.category);
    }
  });
};

/**
 * Read a category
 */
exports.readCategory = function(req, res) {
  res.jsonp(req.category);
};

/**
 * List of categories.
 */
exports.readAll = function(req, res) {
  Category.getAll(function(err, categories) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      if(req.query.flat === 'true') {
        res.jsonp(categories);
      } else {
        _.each(categories, function(category) {
          var sub = _.where(categories, {categoryParent: category.id});
          category.categories = sub.length > 0 ? sub : null;
        });
        res.jsonp(_.where(categories, {categoryParent: null}));
      }
    }
  });
};
