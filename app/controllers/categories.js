'use strict';

var _ = require('underscore');

var categories = [
  {categoryId: 1, categoryName: 'books', categoryParent: null},
  {categoryId: 2, categoryName: 'computers', categoryParent: null},
  {categoryId: 3, categoryName: 'fiction', categoryParent: 1}
];

exports.findCategoryById = function(req, res, next, id) {
  var category = categories[(+id) - 1];
  if(!category) {
    next('explotao');
  } else {
    req.category = category;
    next();
  }
};

/**
 * Create a category
 */
exports.createCategory = function(req, res) {
  req.body.categoryId = categories.length + 1;
  categories.push(req.body);
  res.jsonp(req.body);
};

/**
 * Update a category
 */
exports.updateCategory = function(req, res) {
  var category = req.category;
  console.log(category, req.body);
  category = _.extend(category, req.body);
  categories[category.categoryId - 1] = category;
  res.jsonp(category);
};

/**
 * Delete an category
 */
exports.deleteCategory = function(req, res) {
  var category = req.category;
  categories.splice(category.categoryId, 1);
  res.jsonp(category);
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
  res.jsonp(categories);
};
