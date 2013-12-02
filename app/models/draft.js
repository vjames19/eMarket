'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'product_draft_id': 'id',
  'product_draft_spec_id': 'specId',
  'product_draft_creation_date': 'creationDate',
  'product_draft_update_date': 'updateDate',
  'product_draft_closed_date': 'closedDate',
  'product_spec_category_id': 'categoryId',
  'category_name': 'categoryName',
  'product_spec_name': 'productName',
  'product_spec_nonbid_price': 'nonbidPrice',
  'product_spec_starting_bid_price': 'startingBidPrice',
  'product_spec_bid_end_date': 'bidEndDate',
  'product_spec_shipping_price': 'shippingPrice',
  'product_spec_quantity': 'quantity',
  'product_spec_description': 'description',
  'product_spec_condition': 'condition',
  'product_spec_picture': 'picture',
  'product_spec_brand': 'brand',
  'product_spec_model': 'model',
  'product_spec_dimensions': 'dimensions'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT product_drafts.*, product_specification.* ' +
          'FROM product_drafts INNER JOIN product_specification ' +
          'ON (product_drafts.product_draft_spec_id = product_specification.product_spec_id) ' +
          'WHERE product_draft_user_id = ? AND product_draft_closed_date IS NULL ' +
          'ORDER BY product_draft_creation_date DESC';
      connection.query(sql, [userId], function(err, drafts) {
        callback(err, mapper.mapCollection(drafts, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, draftId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT product_drafts.*, product_specification.* ' +
          'FROM product_drafts INNER JOIN product_specification ' +
          'ON (product_drafts.product_draft_spec_id = product_specification.product_spec_id) ' +
          'WHERE product_draft_user_id = ? AND product_draft_id = ? AND product_draft_closed_date IS NULL ' +
          'ORDER BY product_draft_creation_date DESC';
      connection.query(sql, [userId, draftId], function(err, draft) {
        callback(err, mapper.map(draft[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(draft, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'INSERT INTO product_specification ' +
          '(product_spec_category_id, product_spec_name, product_spec_nonbid_price, ' +
          'product_spec_starting_bid_price, product_spec_bid_end_date, product_spec_shipping_price, ' +
          'product_spec_quantity, product_spec_description, product_spec_condition, product_spec_picture, ' +
          'product_spec_brand, product_spec_model, product_spec_dimensions, product_spec_is_draft) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      var params1 = [
        draft.categoryId, draft.productName, draft.nonbidPrice,
        draft.startingBidPrice, draft.bidEndDate, draft.shippingPrice,
        draft.quantity, draft.description, draft.condition, draft.picture,
        draft.brand, draft.model, draft.dimensions, true
      ];
      var sql2 = 'INSERT INTO product_quantity_record ' +
          '(product_quantity_spec_id, product_quantity_remaining) ' +
          'VALUES (?, ?)';
      var sql3 = 'INSERT INTO product_drafts ' +
          '(product_draft_user_id, product_draft_spec_id, product_draft_creation_date, ' +
          'product_draft_update_date, product_draft_closed_date) ' +
          'VALUES (?, ?, CURRENT_TIMESTAMP, NULL, NULL)';
      var sql4 = 'INSERT INTO product_info ' +
          '(product_seller_id, product_info_spec_id, product_creation_date, product_depletion_date) ' +
          'VALUES (?, ?, CURRENT_TIMESTAMP, NULL)';
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, params1, function(err, insertStatus) {
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              var specId = insertStatus.insertId;
              var params2 = [specId, draft.quantity];
              connection.query(sql2, params2, function(err) {
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                } else {
                  var params3 = [userId, specId];
                  connection.query(sql3, params3, function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    } else {
                      var params4 = [userId, specId];
                      connection.query(sql4, params4, function(err) {
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        } else {
                          connection.commit(function(err) {
                            if(err) {
                              connection.rollback(function() {
                                callback(err);
                              });
                            } else {
                              callback(null, draft);
                              console.log('Draft Created Successfully.');
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
        }
      });
    }
  });
};

module.exports.update = function(draft, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'UPDATE product_specification ' +
          'SET product_spec_category_id = ?, product_spec_name = ?, product_spec_nonbid_price = ?, ' +
          'product_spec_starting_bid_price = ?, product_spec_bid_end_date = ?, product_spec_shipping_price = ?, ' +
          'product_spec_quantity = ?, product_spec_description = ?, product_spec_condition = ?, ' +
          'product_spec_picture = ?, product_spec_brand = ?, product_spec_model = ?, product_spec_dimensions = ? ' +
          'WHERE product_spec_id = ?';
      var params1 = [
        draft.categoryId, draft.productName, draft.nonbidPrice,
        draft.startingBidPrice, draft.bidEndDate, draft.shippingPrice,
        draft.quantity, draft.description, draft.condition,
        draft.picture, draft.brand, draft.model, draft.dimensions,
        draft.specId
      ];
      var sql2 = 'UPDATE product_quantity_record ' +
          'SET product_quantity_remaining = ? ' +
          'WHERE product_quantity_spec_id = ?';
      var params2 = [draft.quantity, draft.specId];
      var sql3 = 'UPDATE product_drafts ' +
          'SET product_draft_update_date = CURRENT_TIMESTAMP ' +
          'WHERE product_draft_id = ?';
      var params3 = [draft.id];
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, params1, function(err) {
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              connection.query(sql2, params2, function(err) {
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                } else {
                  connection.query(sql3, params3, function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    } else {
                      connection.commit(function(err) {
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        } else {
                          callback(null, draft);
                          console.log('Draft Updated Successfully.');
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
    }
  });
};

module.exports.remove = function(draft, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'UPDATE product_specification ' +
          'SET product_spec_is_draft = FALSE, product_spec_quantity = product_spec_quantity - 1 ' +
          'WHERE product_spec_id = ?';
      var params1 = [draft.specId];
      var sql2 = 'UPDATE product_quantity_record ' +
          'SET product_quantity_remaining = product_quantity_remaining - 1 ' +
          'WHERE product_quantity_spec_id = ?';
      var params2 = [draft.specId];
      var sql3 = 'UPDATE product_drafts ' +
          'SET product_draft_closed_date = CURRENT_TIMESTAMP ' +
          'WHERE product_draft_id = ?';
      var params3 = [draft.id];
      var sql4 = 'UPDATE product_info ' +
          'SET product_creation_date = CURRENT_TIMESTAMP ' +
          'WHERE product_info_spec_id = ?';
      var params4 = [draft.specId];
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, params1, function(err) {
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              connection.query(sql2, params2, function(err) {
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                } else {
                  connection.query(sql3, params3, function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    } else {
                      connection.query(sql4, params4, function(err) {
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        } else {
                          connection.commit(function(err) {
                            if(err) {
                              connection.rollback(function() {
                                callback(err);
                              });
                            } else {
                              callback(null, draft);
                              console.log('Draft Closed Successfully and Product Posted.');
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
        }
      });
    }
  });
};


