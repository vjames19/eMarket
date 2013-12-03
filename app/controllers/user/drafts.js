'use strict';

var _ = require('underscore');
var Drafts = require('../../models/draft.js');

exports.findDraftById = function(req, res, next, id) {
  Drafts.get(req.params.userId, id, function(err, draft) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(draft)) {
      res.jsonp(404, {message: 'Draft with id ' + id + ' not found.'});
    } else {
      req.draft = draft;
      next();
    }
  });
};

exports.readAllDrafts = function(req, res) {
  Drafts.getAll(req.params.userId, function(err, drafts) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(drafts)) {
      res.jsonp(404, {message: 'Drafts not found.'});
    } else {
      res.jsonp(200, drafts);
    }
  });
};

exports.readDraft = function(req, res) {
  if(!req.draft) {
    res.jsonp(404, {message: 'Draft not found.'});
  } else {
    res.jsonp(200, req.draft);
  }
};

exports.createDraft = function(req, res) {
  Drafts.create(req.body, req.params.userId, function(err, draft) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(201, draft);
    }
  });
};

exports.updateDraft = function(req, res) {
  Drafts.update(req.body, req.params.userId, function(err, draft) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, draft);
    }
  });
};

exports.deleteDraft = function(req, res) {
  Drafts.remove(req.draft, req.params.userId, function(err, draft) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, draft);
    }
  });
};
