'use strict';

var _ = require('underscore');
var Admins = require('../models/admin.js');
var Reports = require('../models/report.js');

// Admin

exports.findAdminById = function(req, res, next, id) {
  Admins.get(id, function(err, admin) {
    if(_.isEmpty(admin)) {
      res.jsonp(404, {message: 'Admin with id ' + id + ' not found'});
    } else {
      req.admin = admin;
      next();
    }
  });
};

exports.readAllAdmins = function(req, res) {
  Admins.getAll(function(err, admins) {
    res.jsonp(admins);
  });
};

exports.readAdmin = function(req, res) {
  res.jsonp(req.admin);
};

exports.createAdmin = function(req, res) {
  Admins.create(req.body, function(err, admin) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(201, admin);
    }
  });
};

exports.updateAdmin = function(req, res) {
  var id = req.admin.id;
  _.extend(req.admin, req.body);
  req.admin.id = id;
  Admins.update(req.admin, function(err, admin) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(200, admin);
    }
  });
};

exports.deleteAdmin = function(req, res) {
  Admins.remove(req.admin.id, function(err) {
    if(err) {
      res.jsonp(500, err);
    } else {
      res.jsonp(200, req.admin);
    }
  });
};

// Reports Day (Read-Only)

exports.findReportByIdDay = function(req, res, next, id) {
  Reports.get(id, 'day', function(err, report) {
    if(_.isEmpty(report)) {
      res.jsonp(404, {message: 'Daily Report with id ' + id + ' not found'});
    } else {
      req.dailyReport = report;
      next();
    }
  });
};

exports.readAllReportsDay = function(req, res) {
  Reports.getAll('day', function(err, reports) {
    res.jsonp(reports);
  });
};

exports.readReportDay = function(req, res) {
  res.jsonp(req.dailyReport);
};

exports.readReportDayTotal = function(req, res) {
  Reports.getTotal('day', function(err, total) {
    res.jsonp(total);
  });
};

// Reports Week (Read-Only)

exports.findReportByIdWeek = function(req, res, next, id) {
  Reports.get(id, 'week', function(err, report) {
    if(_.isEmpty(report)) {
      res.jsonp(404, {message: 'Weekly Report with id ' + id + ' not found'});
    } else {
      req.weeklyReport = report;
      next();
    }
  });
};

exports.readAllReportsWeek = function(req, res) {
  Reports.getAll('week', function(err, reports) {
    res.jsonp(reports);
  });
};

exports.readReportWeek = function(req, res) {
  res.jsonp(req.weeklyReport);
};

exports.readReportWeekTotal = function(req, res) {
  Reports.getTotal('week', function(err, total) {
    res.jsonp(total);
  });
};

// Reports Month (Read-Only)

exports.findReportByIdMonth = function(req, res, next, id) {
  Reports.get(id, 'month', function(err, report) {
    if(_.isEmpty(report)) {
      res.jsonp(404, {message: 'Monthly Report with id ' + id + ' not found'});
    } else {
      req.monthlyReport = report;
      next();
    }
  });
};

exports.readAllReportsMonth = function(req, res) {
  Reports.getAll('month', function(err, reports) {
    res.jsonp(reports);
  });
};

exports.readReportMonth = function(req, res) {
  res.jsonp(req.monthlyReport);
};

exports.readReportMonthTotal = function(req, res) {
  Reports.getTotal('month', function(err, total) {
    res.jsonp(total);
  });
};
