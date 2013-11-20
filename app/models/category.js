'use strict';

var _ = require('underscore');
var async = require('async');
var mapper = require('../mapper');
var validate = require('jsonschema').validate;

var DICTIONARY = {
  'category_id': 'id',
  'category_name': 'categoryName',
  'category_parent_id': 'categoryParent',
  'category_status': 'categoryStatus'
};

var SCHEMA = {
  "type": "object",
  "properties": {
    "categoryName": {
      "type": "string",
      "required": true
    },
    "categoryParent": {
      "type": "integer",
      "minimum": 1,
      "required": true
    },
    "categoryStatus": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1,
      "required": true
    },
    "id": {
      "type": "integer",
      "required": true
    }
  }
};

module.exports.validate = function(object) {
  return validate(object, SCHEMA).errors;
};

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
    // TODO: Verify parent id; <-- This Still needs to be done?
    var sql = 'UPDATE category_info ' +
        'SET category_name = ?, category_parent_id = ?, category_status = ? ' +
        'WHERE category_id = ?';
    var params = [category.categoryName, category.categoryParent, category.categoryStatus, category.id];
    console.log(params);
    connection.query(sql, params, function(err) {
      callback(err, category);
    });
  });
};

module.exports.remove = function(id, callback) {
  executor.execute(function(err, connection) {

    connection.beginTransaction(function(err) {
      if(err) {
        callback(err);
      }

      var sql1 = 'SELECT category_id FROM category_info ' +
          'WHERE category_status = 1 AND category_parent_id = ?';

      connection.query(sql1, [id], function(err, children) {
        if(err) {
          connection.rollback(function() {
            callback(err);
          });
        }

        var sql2 = 'SELECT category_parent_id FROM category_info ' +
            'WHERE category_status = 1 AND category_id = ?';

        connection.query(sql2, [id], function(err, parent) {
          if(err) {
            connection.rollback(function() {
              callback(err);
            });
          }

          var parentId = (mapper.map(parent[0], DICTIONARY)).categoryParent;

          var sql3 = 'SELECT category_id FROM category_info ' +
              'WHERE category_status = 1 AND category_name = ?';

          connection.query(sql3, ['Other'], function(err, other) {
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            }

            var otherId = (mapper.map(other[0], DICTIONARY)).id;

            // Has Parent
            if(parentId !== null) {

              var sql8 = 'UPDATE product_specification ' +
                  'SET product_spec_category_id = ? WHERE product_spec_category_id = ?';

              connection.query(sql8, [parentId, id], function(err) {
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                }

                // No Children
                if(children.length <= 0) {

                  var sql9 = 'UPDATE category_info SET category_status = 0 WHERE category_id = ?';

                  connection.query(sql9, [id], function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    }

                    connection.commit(function(err) {
                      if(err) {
                        connection.rollback(function() {
                          callback(err);
                        });
                      }
                      callback(null, id);
                      console.log('Finished Deleting Category with Parent and No Children!');
                    });

                  });

                }
                // Has Children
                else {

                  var sql6 = 'UPDATE category_info SET category_parent_id = ? ' +
                      'WHERE category_status = 1 AND category_parent_id = ?';

                  connection.query(sql6, [parentId, id], function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    }

                    var sql7 = 'UPDATE category_info SET category_status = 0 WHERE category_id = ?';

                    connection.query(sql7, [id], function(err) {
                      if(err) {
                        connection.rollback(function() {
                          callback(err);
                        });
                      }

                      connection.commit(function(err) {
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        }
                        callback(null, id);
                        console.log('Finished Deleting Category With Parent and With Children!');
                      });

                    });

                  });

                }

              });

            }
            // No Parent
            else {

              var sql4 = 'UPDATE product_specification ' +
                  'SET product_spec_category_id = ? WHERE product_spec_category_id = ?';

              connection.query(sql4, [otherId, id], function(err) {
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                }

                // No Children
                if(children.length <= 0) {

                  var sql5 = 'UPDATE category_info SET category_status = 0 WHERE category_id = ?';

                  connection.query(sql5, [id], function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    }

                    connection.commit(function(err) {
                      if(err) {
                        connection.rollback(function() {
                          callback(err);
                        });
                      }
                      callback(null, id);
                      console.log('Finished Deleting Category with No Parent and No Children!');
                    });

                  });

                }
                // Has Children
                else {

                  var sql6 = 'UPDATE category_info SET category_parent_id = NULL ' +
                      'WHERE category_status = 1 AND category_parent_id = ?';

                  connection.query(sql6, [id], function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    }

                    var sql7 = 'UPDATE category_info SET category_status = 0 WHERE category_id = ?';

                    connection.query(sql7, [id], function(err) {
                      if(err) {
                        connection.rollback(function() {
                          callback(err);
                        });
                      }

                      connection.commit(function(err) {
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        }
                        callback(null, id);
                        console.log('Finished Deleting Category With No Parent and With Children!');
                      });

                    });

                  });

                }
              });

            }

          });

        });

      });

    });

  });
};

var getAllChildrenIds = function(categoryParentId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT category_id FROM category_info ' +
        'WHERE category_status = 1 AND category_parent_id = ?';
    connection.query(sql, [categoryParentId], function(err, categories) {
      callback(err, mapper.mapCollection(categories, DICTIONARY));
    });
  });
};

var getAllSubtreeIdsHelper = function(categoryParentId, results, allDone) {
  getAllChildrenIds(categoryParentId, function(err, categories) {
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
