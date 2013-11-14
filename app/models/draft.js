'use strict';

var _ = require('underscore');
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
    var sql = 'SELECT product_drafts.*, product_specification.* ' +
              'FROM product_drafts INNER JOIN product_specification ' +
              'ON (product_drafts.product_draft_spec_id = product_specification.product_spec_id) ' +
              'WHERE product_draft_user_id = ? ' +
              'ORDER BY product_draft_creation_date DESC';
    connection.query(sql, [userId], function(err, drafts) {
      if(err) {
        callback(err);
      } else {
        callback(null, mapper.mapCollection(drafts, DICTIONARY));
      }
    });
  });
};

module.exports.get = function(userId, draftId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT product_drafts.*, product_specification.* ' +
              'FROM product_drafts INNER JOIN product_specification ' +
              'ON (product_drafts.product_draft_spec_id = product_specification.product_spec_id) ' +
              'WHERE product_draft_user_id = ? AND product_draft_id = ?' +
              'ORDER BY product_draft_creation_date DESC';
    connection.query(sql, [userId, draftId], function(err, draft) {
      callback(err, mapper.map(draft[0], DICTIONARY));
    });
  });
};



