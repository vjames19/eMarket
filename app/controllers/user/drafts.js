'use strict';

var _ = require('underscore');
var Drafts = require('../../models/draft.js');

// Drafts
//var drafts = {
//  1: {
//    draftId: 1,
//    userFirstName: 'Chencho',
//    userMiddleName: 'Mata',
//    userLastName: 'Vaca',
//    userTelephone: '787-459-6285',
//    productSellerId: 1,
//    productCategory: 'books',
//    productName: 'harry potter',
//    productBuyItNowPrice: null,
//    productStartingBidPrice: null,
//    productBidEndDate: '07/07/2007',
//    productShippingPrice: null,
//    productQuantity: 5,
//    productDescription: {
//      productCondition: 'New',
//      productPicture: '/img/products/users/1/z98how.png',
//      productBrand: 'pearson',
//      productModel: 'IBN:19238476',
//      productDimensions: '30x29x49'
//    }
//  },
//  2: {
//    draftId: 2,
//    userFirstName: 'Chencho',
//    userMiddleName: 'Mata',
//    userLastName: 'Vaca',
//    userTelephone: '787-459-6285',
//    productSellerId: 9,
//    productCategory: 'computers',
//    productName: 'alienware',
//    productBuyItNowPrice: null,
//    productStartingBidPrice: null,
//    productBidEndDate: '07/07/2008',
//    productShippingPrice: null,
//    productQuantity: 3,
//    productDescription: {
//      productCondition: 'Refurbished',
//      productPicture: '/img/products/users/9/z98gyu.png',
//      productBrand: 'dell',
//      productModel: 'M179385',
//      productDimensions: '19x30x25'
//    }
//  }
//};

exports.findDraftById = function(req, res, next, id) {
  Drafts.get(req.params.userId, id, function(err, draft) {
    if(err) {
      res.jsonp(500, err);
    } else if(_.isEmpty(draft)) {
      res.jsonp(404, {message: 'Draft with id ' + id + ' not found'});
    } else {
      req.draft = draft;
      next();
    }
  });
};

exports.readAllDrafts = function(req, res) {
  Drafts.getAll(req.params.userId, function(err, drafts) {
    if(err) {
      res.jsonp(500, err);
    } else if(_.isEmpty(drafts)) {
      res.jsonp(404, {message: 'Drafts not found'});
    } else {
      res.jsonp(200, drafts);
    }
  });
};

exports.readDraft = function(req, res) {
  res.jsonp(req.draft);
};

exports.createDraft = function(req, res) {
  var userId = req.params.userId;
  Drafts.create(req.body, userId, function(err, draft) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(201, draft);
    }
  });
};

exports.updateDraft = function(req, res) {
  var userId = req.params.userId;
  Drafts.update(req.body, userId, function(err, draft) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(200, draft);
    }
  });
};

exports.deleteDraft = function(req, res) {
  var userId = req.params.userId;
  Drafts.remove(req.body, userId, function(err, draft) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(200, draft);
    }
  });
};

//exports.createDraft = function(req, res) {
//  var draft = req.body;
//  draft.draftId = _.keys(drafts).length + 1;
//  drafts[draft.draftId] = draft;
//  res.jsonp(draft);
//};

//exports.updateDraft = function(req, res) {
//  _.extend(req.draft, req.body);
//  drafts[req.draft.draftId] = req.draft;
//  res.jsonp(req.draft);
//};

//exports.deleteDraft = function(req, res) {
//  delete drafts[req.draft.draftId];
//  res.jsonp(req.draft);
//};
