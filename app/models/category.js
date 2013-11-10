'use strict';

var _ = require('underscore');
var async = require('async');
var mapper = require('../mapper');

var DICTIONARY = {
  'category_id': 'id',
  'category_name': 'categoryName',
  'category_parent_id': 'categoryParent',
  'category_status': 'categoryStatus'
};

var WHITELIST = ['id', 'categoryName', 'categoryParent', 'categoryStatus'];

var executor = null;

module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * from category_info WHERE category_status = true';
    connection.query(sql, function(err, categories) {
      if(err) {
        callback(err);
      } else {
        callback(null, mapper.mapCollection(categories, DICTIONARY));
      }
    });
  });
};

module.exports.get = function(id, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * FROM category_info WHERE category_status = true AND category_id = ?';
    connection.query(sql, [id], function(err, categories) {
      callback(err, mapper.map(categories[0], DICTIONARY));
    });
  });
};

module.exports.create = function(category, callback) {
  executor.execute(function(err, connection) {
    var sql = 'INSERT INTO category_info (category_name, category_parent_id) VALUES (?, ?)';
    category = _.pick(category, WHITELIST);
    connection.query(sql, [category.categoryName, category.categoryParent], function(err, insertStatus) {
      if(err) {
        callback(err);
      } else {
        category.id = insertStatus.insertId;
        callback(null, category);
      }
    });
  });
};

module.exports.update = function(category, callback) {
  category = _.pick(category, WHITELIST);
  executor.execute(function(err, connection) {
    // TODO: Verify parent id;
    var sql = 'UPDATE category_info SET category_name=?, category_parent_id=?, category_status=? ' +
        'WHERE category_id=?';
    var params = [category.categoryName, category.categoryParent, category.categoryStatus, category.id];
    connection.query(sql, params, function(err) {
      callback(err, category);
    });
  });
};

module.exports.delete = function(id, callback) {
  executor.execute(function(err, connection) {
    var sql = 'UPDATE category_info SET category_status=0 WHERE category_id = ?';
    connection.query(sql, [id], callback);
  });
};

module.exports.getAllChildrenIds = function(categoryParentId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT category_id FROM category_info ' +
        'WHERE category_status=1 AND category_parent_id=?';
    connection.query(sql, [categoryParentId], function(err, categories) {
      callback(err, mapper.mapCollection(categories, DICTIONARY));
    });
  });
};

var getAllSubtreeIdsHelper = function(categoryParentId, results, allDone) {
  module.exports.getAllChildrenIds(categoryParentId, function(err, categories) {
    if(err) {
      allDone(err);
    }
    async.forEach(categories, function(category, callback) {
      results.push(category.id);
      getAllSubtreeIdsHelper(category.id, results, callback);
    }, function() {
      allDone(null, results);
    });
  });
};

module.exports.getAllSubTreeIds = function(categoryParentId, callback) {
  var results = [];
  getAllSubtreeIdsHelper(categoryParentId, results, callback);
};
