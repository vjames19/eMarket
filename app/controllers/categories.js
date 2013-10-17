'use strict';

var _ = require('underscore');
var Category = require('../models/category');

var categories = {
  1: {categoryId: 1, categoryName: 'books', categoryParent: null},
  2: {categoryId: 2, categoryName: 'computers', categoryParent: null},
  3: {categoryId: 3, categoryName: 'fiction', categoryParent: 1 },
  4: {categoryId: 4, categoryName: 'Horror', categoryParent: 1 }
};

exports.findCategoryById = function(req, res, next, id) {
  Category.get(id, function(err, category) {
    console.log('find by id', category);
    if(!category) {
      res.jsonp(404, {message: 'Not found'});
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
  console.log('category request', req.body);
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
  var category = req.category;
  category = _.extend(category, req.body);
  categories[category.categoryId] = category;
  res.jsonp(category);
};

/**
 * Delete a category
 */
exports.deleteCategory = function(req, res) {
  Category.delete(req.category.id, function(err) {
    console.log('delete category', arguments);
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
      if(req.query.flat) {
        res.jsonp(categories);
      } else {
        _.each(categories, function(category) {
          var sub = _.where(categories, {categoryParent: category.categoryId});
          category.categories = sub.length > 0 ? sub : null;
        });
        res.jsonp(_.where(categories, {categoryParent: null}));
      }
    }
  });
};
