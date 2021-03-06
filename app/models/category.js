'use strict';

//var _ = require('underscore');
var async = require('async');
var mapper = require('../mapper');
var logger = require('../logger');
var validate = require('jsonschema').validate;

var DICTIONARY = {
  'category_id': 'id',
  'category_name': 'categoryName',
  'category_parent_id': 'categoryParent',
  'category_status': 'categoryStatus'
};

var SCHEMA = {
  'type': 'object',
  'properties': {
    'categoryName': {
      'type': 'string',
      'required': true
    },
    'categoryParent': {
      'type': 'any',
      'required': false
    }//,
//    'categoryStatus': {
//      'type': 'integer',
//      'minimum': 0,
//      'maximum': 1,
//      'required': true
//    },
//    'id': {
//      'type': 'integer',
//      'required': true
//    }
  }
};

module.exports.validate = function(object) {
  console.log(object);
  return validate(object, SCHEMA).errors;
};

var executor = null;

module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT * from category_info WHERE category_status = true';
      connection.query(sql, function(err, categories) {
        logger.logQuery('category_getAll:', this.sql);
        callback(err, mapper.mapCollection(categories, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(id, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT * FROM category_info WHERE category_status = true AND category_id = ?';
      connection.query(sql, [id], function(err, categories) {
        logger.logQuery('category_get:', this.sql);
        callback(err, mapper.map(categories[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(category, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'INSERT INTO category_info (category_name, category_parent_id) VALUES (?, ?)';
      connection.query(sql, [category.categoryName, category.categoryParent], function(err, insertStatus) {
        logger.logQuery('category_create:', this.sql);
        if(err) {
          callback(err);
        } else {
          category.id = insertStatus.insertId;
          callback(null, category);
        }
      });
    }
  });
};

module.exports.update = function(category, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'UPDATE category_info ' +
          'SET category_name = ?, category_parent_id = ?, category_status = ? ' +
          'WHERE category_id = ?';
      var params = [category.categoryName, category.categoryParent, category.categoryStatus, category.id];
      connection.query(sql, params, function(err) {
        logger.logQuery('category_update:', this.sql);
        callback(err, category);
      });
    }
  });
};

module.exports.remove = function(id, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        }
        else {
          var sql1 = 'SELECT category_id FROM category_info ' +
              'WHERE category_status = 1 AND category_parent_id = ?';

          connection.query(sql1, [id], function(err, children) {
            logger.logQuery('category_remove:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            }
            else {
              var sql2 = 'SELECT category_parent_id FROM category_info ' +
                  'WHERE category_status = 1 AND category_id = ?';

              connection.query(sql2, [id], function(err, parent) {
                logger.logQuery('category_remove:', this.sql);
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                }
                else {
                  var parentId = (mapper.map(parent[0], DICTIONARY)).categoryParent;

                  var sql3 = 'SELECT category_id FROM category_info ' +
                      'WHERE category_status = 1 AND category_name = ?';

                  connection.query(sql3, ['Other'], function(err, other) {
                    logger.logQuery('category_remove:', this.sql);
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    }
                    else {
                      var otherId = (mapper.map(other[0], DICTIONARY)).id;

                      // Has Parent
                      if(parentId !== null) {

                        var sql8 = 'UPDATE product_specification ' +
                            'SET product_spec_category_id = ? WHERE product_spec_category_id = ?';

                        connection.query(sql8, [parentId, id], function(err) {
                          logger.logQuery('category_remove:', this.sql);
                          if(err) {
                            connection.rollback(function() {
                              callback(err);
                            });
                          }
                          else {
                            // No Children
                            if(children.length <= 0) {

                              var sql9 = 'UPDATE category_info SET category_status = 0 WHERE category_id = ?';

                              connection.query(sql9, [id], function(err) {
                                logger.logQuery('category_remove:', this.sql);
                                if(err) {
                                  connection.rollback(function() {
                                    callback(err);
                                  });
                                }
                                else {
                                  connection.commit(function(err) {
                                    if(err) {
                                      connection.rollback(function() {
                                        callback(err);
                                      });
                                    }
                                    else {
                                      callback(null, id);
                                      console.log('Finished Deleting Category with Parent and No Children!');
                                    }
                                  });
                                }
                              });

                            }
                            // Has Children
                            else {

                              var sql6 = 'UPDATE category_info SET category_parent_id = ? ' +
                                  'WHERE category_status = 1 AND category_parent_id = ?';

                              connection.query(sql6, [parentId, id], function(err) {
                                logger.logQuery('category_remove:', this.sql);
                                if(err) {
                                  connection.rollback(function() {
                                    callback(err);
                                  });
                                }
                                else {
                                  var sql7 = 'UPDATE category_info SET category_status = 0 WHERE category_id = ?';

                                  connection.query(sql7, [id], function(err) {
                                    logger.logQuery('category_remove:', this.sql);
                                    if(err) {
                                      connection.rollback(function() {
                                        callback(err);
                                      });
                                    }
                                    else {
                                      connection.commit(function(err) {
                                        if(err) {
                                          connection.rollback(function() {
                                            callback(err);
                                          });
                                        }
                                        else {
                                          callback(null, id);
                                          console.log('Finished Deleting Category With Parent and With Children!');
                                        }
                                      });
                                    }
                                  });
                                }
                              });

                            }
                          }
                        });

                      }
                      // No Parent
                      else {

                        var sql4 = 'UPDATE product_specification ' +
                            'SET product_spec_category_id = ? WHERE product_spec_category_id = ?';

                        connection.query(sql4, [otherId, id], function(err) {
                          logger.logQuery('category_remove:', this.sql);
                          if(err) {
                            connection.rollback(function() {
                              callback(err);
                            });
                          }
                          else {
                            // No Children
                            if(children.length <= 0) {

                              var sql5 = 'UPDATE category_info SET category_status = 0 WHERE category_id = ?';

                              connection.query(sql5, [id], function(err) {
                                logger.logQuery('category_remove:', this.sql);
                                if(err) {
                                  connection.rollback(function() {
                                    callback(err);
                                  });
                                }
                                else {
                                  connection.commit(function(err) {
                                    if(err) {
                                      connection.rollback(function() {
                                        callback(err);
                                      });
                                    }
                                    else {
                                      callback(null, id);
                                      console.log('Finished Deleting Category with No Parent and No Children!');
                                    }
                                  });
                                }
                              });

                            }
                            // Has Children
                            else {

                              var sql6 = 'UPDATE category_info SET category_parent_id = NULL ' +
                                  'WHERE category_status = 1 AND category_parent_id = ?';

                              connection.query(sql6, [id], function(err) {
                                logger.logQuery('category_remove:', this.sql);
                                if(err) {
                                  connection.rollback(function() {
                                    callback(err);
                                  });
                                }
                                else {
                                  var sql7 = 'UPDATE category_info SET category_status = 0 WHERE category_id = ?';

                                  connection.query(sql7, [id], function(err) {
                                    logger.logQuery('category_remove:', this.sql);
                                    if(err) {
                                      connection.rollback(function() {
                                        callback(err);
                                      });
                                    }
                                    else {
                                      connection.commit(function(err) {
                                        if(err) {
                                          connection.rollback(function() {
                                            callback(err);
                                          });
                                        }
                                        else {
                                          callback(null, id);
                                          console.log('Finished Deleting Category With No Parent and With Children!');
                                        }
                                      });
                                    }
                                  });
                                }
                              });

                            }
                          }
                        });

                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

var getAllChildrenIds = function(categoryParentId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT category_id FROM category_info ' +
          'WHERE category_status = 1 AND category_parent_id = ?';
      connection.query(sql, [categoryParentId], function(err, categories) {
        logger.logQuery('category_getAllChildrenIds:', this.sql);
        callback(err, mapper.mapCollection(categories, DICTIONARY));
      });
    }
  });
};

var getAllSubtreeIdsHelper = function(categoryParentId, results, allDone) {
  getAllChildrenIds(categoryParentId, function(err, categories) {
    if(err) {
      allDone(err);
    } else {
      async.forEach(categories, function(category, callback) {
        results.push(category.id);
        getAllSubtreeIdsHelper(category.id, results, callback);
      }, function() {
        allDone(null, results);
      });
    }
  });
};

module.exports.getAllSubTreeIds = function(categoryParentId, callback) {
  var results = [];
  getAllSubtreeIdsHelper(categoryParentId, results, callback);
};
