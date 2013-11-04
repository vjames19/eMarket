'use strict';

var _ = require('underscore');
var Admins = require('../models/admin.js');
var Reports = require('../models/report.js');

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

exports.isAdmin = function(user, callback) {
  Admins.getAll(function(err, admins) {
    if(err) {
      callback(err);
    } else {
      callback(null, _.contains(_.pluck(admins, 'username'), user.username));
    }
  });
};

//exports.isAdmin = function(user) {
//  return _.contains(_.pluck(admins, 'adminUserName'), user.username);
//};

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

//exports.findAdminById = function(req, res, next, id) {
//  if(!admins[+id]) {
//    res.jsonp(404, {message: 'Admin Not Found.'});
//  } else {
//    req.admin = admins[+id];
//    next();
//  }
//};

exports.readAllAdmins = function(req, res) {
  Admins.getAll(function(err, admins) {
    res.jsonp(admins);
  });
};

//exports.readAllAdmins = function(req, res) {
//  res.jsonp(_.values(admins));
//};

exports.createAdmin = function(req, res) {
  var admin = req.body;
  admin.adminId = _.keys(admins).length + 1;
  admins[admin.adminId] = admin;
  res.jsonp(admin);
};

exports.readAdmin = function(req, res) {
  res.jsonp(req.admin);
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

// Report methods
var reports = {
  1: {
    reportId: 1,
    reportDate: '07/08/2010',
    reportSales: 100,
    reportRevenue: 1000,
    reportCategory: null
  },
  2: {
    reportId: 2,
    reportDate: '07/08/2010',
    reportSales: 1000,
    reportRevenue: 10000,
    reportCategory: 'computers'
  },
  3: {
    reportId: 3,
    reportDate: '07/08/2010',
    reportSales: 10,
    reportRevenue: 100,
    reportCategory: 'books'
  }
};

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

//exports.findReportById = function(req, res, next, id) {
//  if(!reports[+id]) {
//    res.jsonp(404, {message: 'Report Not Found'});
//  } else {
//    req.report = reports[+id];
//    next();
//  }
//};


exports.readAllReportsMonth = function(req, res) {
  Reports.getAll('month', function(err, reports) {
    res.jsonp(reports);
  });
};

exports.readAllReportsWeek = function(req, res) {
  Reports.getAll('week', function(err, reports) {
    res.jsonp(reports);
  });
};

exports.readAllReportsDay = function(req, res) {
  Reports.getAll('day', function(err, reports) {
    res.jsonp(reports);
  });
};

//exports.readAllReports = function(req, res) {
//  res.jsonp(_.values(reports));
//};

exports.createReport = function(req, res) {
  var report = req.body;
  report.reportId = _.keys(reports).length + 1;
  reports[report.reportId] = report;
  res.jsonp(report);
};

exports.readReportMonth = function(req, res) {
  res.jsonp(req.monthlyReport);
};

exports.readReportWeek = function(req, res) {
  res.jsonp(req.weeklyReport);
};

exports.readReportDay = function(req, res) {
  res.jsonp(req.dailyReport);
};

//exports.readReport = function(req, res) {
//  res.jsonp(req.report);
//};

exports.updateReport = function(req, res) {
  _.extend(req.report, req.body);
  reports[req.report.reportId] = req.report;
  res.jsonp(req.report);
};

exports.deleteReport = function(req, res) {
  delete reports[req.report.reportId];
  res.jsonp(req.report);
};

exports.readReportMonthTotal = function(req, res) {
  Reports.getTotal('month', function(err, total) {
    res.jsonp(total);
  });
};

exports.readReportWeekTotal = function(req, res) {
  Reports.getTotal('week', function(err, total) {
    res.jsonp(total);
  });
};

exports.readReportDayTotal = function(req, res) {
  Reports.getTotal('day', function(err, total) {
    res.jsonp(total);
  });
};
