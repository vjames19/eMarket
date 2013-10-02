'use strict';

var _ = require('underscore');

var admins = {
  1: {
    adminId: 1,
    adminUserName: 'root',
    adminFirstName: 'Juan',
    adminMiddleName: 'Del',
    adminLastName: 'Pueblo',
    adminEmail: 'juan.del.pueblo@ptm.db',
    adminPhone: '7775554444',
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
    adminIsRoot: false
  }
};

exports.isAdmin = function (user) {
  return _.contains(_.pluck(admins, 'adminUserName'), user.username);
};

exports.findAdminById = function (req, res, next, id) {
  if (!admins[+id]) {
    res.jsonp(404, {message: 'Admin Not Found.'});
  } else {
    req.admin = admins[+id];
    next();
  }
};

exports.readAllAdmins = function (req, res) {
  res.jsonp(_.values(admins));
};

exports.createAdmin = function (req, res) {
  var admin = req.body;
  admin.adminId = _.keys(admins).length + 1;
  admins[admin.adminId] = admin;
  res.jsonp(admin);
};

exports.readAdmin = function (req, res) {
  res.jsonp(req.admin);
};

exports.updateAdmin = function (req, res) {
  _.extend(req.admin, req.body);
  admins[req.admin.adminId] = req.admin;
  res.jsonp(req.admin);
};

exports.deleteAdmin = function (req, res) {
  delete admins[req.admin.adminId];
  res.jsonp(req.admin);
};

// Report methods
var reports = {
  1: {
    reportId: 1,
    reportSales: 100,
    reportRevenue: 1000,
    reportCategory: null
  },
  2: {
    reportId: 2,
    reportSales: 1000,
    reportRevenue: 10000,
    reportCategory: 'computers'
  },
  3: {
    reportId: 3,
    reportSales: 10,
    reportRevenue: 100,
    reportCategory: 'books'
  }
};

exports.findAdminReportById = function (req, res, next, id) {
  if (!reports[+id]) {
    res.jsonp(404, {message: 'Report Not Found'});
  } else {
    req.report = reports[+id];
    next();
  }
};

exports.readAllAdminReports = function (req, res) {
  res.jsonp(_.values(reports));
};

exports.createAdminReport = function (req, res) {
  var report = req.body;
  report.reportId = _.keys(reports).length + 1;
  reports[report.reportId] = report;
  res.jsonp(report);
};

exports.readAdminReport = function (req, res) {
  res.jsonp(req.report);
};

exports.updateAdminReport = function (req, res) {
  _.extend(req.report, req.body);
  reports[req.report.reportId] = req.report;
  res.jsonp(req.report);
};

exports.deleteAdminReport = function (req, res) {
  delete reports[req.report.reportId];
  res.jsonp(req.report);
};
