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

// Dummy Data for Compatibility

var admins = {
  1: {
    adminId: 1,
    adminUserName: 'root',
    adminFirstName: 'Juan',
    adminMiddleName: 'Del',
    adminLastName: 'Pueblo',
    adminEmail: 'juan.del.pueblo@ptm.db',
    adminPhone: '7775554444',
    adminPassword: '123',
    adminIsRoot: true
  },
  2: {
    adminId: 2,
    adminUserName: 'admin',
    adminFirstName: 'Jesus',
    adminMiddleName: 'Del',
    adminLastName: 'Campo',
    adminEmail: 'jesus.del.campo@wtf.db',
    adminPhone: '3332221111',
    adminPassword: '456',
    adminIsRoot: false
  }
};

exports.createAdmin = function(req, res) {
  var admin = req.body;
  admin.adminId = _.keys(admins).length + 1;
  admins[admin.adminId] = admin;
  res.jsonp(admin);
};

exports.updateAdmin = function(req, res) {
  _.extend(req.admin, req.body);
  admins[req.admin.adminId] = req.admin;
  res.jsonp(req.admin);
};

exports.deleteAdmin = function(req, res) {
  delete admins[req.admin.adminId];
  res.jsonp(req.admin);
};
