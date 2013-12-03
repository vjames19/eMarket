'use strict';

var _ = require('underscore');
var Admins = require('../models/admin.js');
var Reports = require('../models/report.js');

// Admin

exports.findAdminById = function(req, res, next, id) {
  Admins.get(id, function(err, admin) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(admin)) {
      res.jsonp(404, {message: 'Admin with id ' + id + ' not found.'});
    } else {
      req.admin = admin;
      next();
    }
  });
};

exports.readAllAdmins = function(req, res) {
  Admins.getAll(function(err, admins) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(admins)) {
      res.jsonp(404, {message: 'Admins not found.'});
    } else {
      res.jsonp(200, admins);
    }
  });
};

exports.readAdmin = function(req, res) {
  if(!req.admin) {
    res.jsonp(404, {message: 'Admin not found.'});
  } else {
    res.jsonp(200, req.admin);
  }
};

exports.createAdmin = function(req, res) {
  Admins.create(req.body, function(err, admin) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(201, admin);
    }
  });
};

exports.updateAdmin = function(req, res) {
  Admins.update(req.body, function(err, admin) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, admin);
    }
  });
};

exports.deleteAdmin = function(req, res) {
  Admins.remove(req.admin.id, function(err) {
    if(err) {
      res.jsonp(500, {message: err});
    } else {
      res.jsonp(200, req.admin);
    }
  });
};

// Reports Day (Read-Only)

exports.findReportByIdDay = function(req, res, next, id) {
  Reports.get(id, 'day', function(err, report) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(report)) {
      res.jsonp(404, {message: 'Daily Report with id ' + id + ' not found.'});
    } else {
      req.dailyReport = report;
      next();
    }
  });
};

exports.readAllReportsDay = function(req, res) {
  Reports.getAll('day', function(err, reports) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(reports)) {
      res.jsonp(404, {message: 'Reports not found.'});
    } else {
      res.jsonp(200, reports);
    }
  });
};

exports.readReportDay = function(req, res) {
  if(!req.dailyReport) {
    res.jsonp(404, {message: 'Daily Report not found.'});
  } else {
    res.jsonp(200, req.dailyReport);
  }
};

exports.readReportDayTotal = function(req, res) {
  Reports.getTotal('day', function(err, total) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(total)) {
      res.jsonp(404, {message: 'Daily Total Report not found.'});
    } else {
      res.jsonp(200, total);
    }
  });
};

// Reports Week (Read-Only)

exports.findReportByIdWeek = function(req, res, next, id) {
  Reports.get(id, 'week', function(err, report) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(report)) {
      res.jsonp(404, {message: 'Weekly Report with id ' + id + ' not found.'});
    } else {
      req.weeklyReport = report;
      next();
    }
  });
};

exports.readAllReportsWeek = function(req, res) {
  Reports.getAll('week', function(err, reports) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(reports)) {
      res.jsonp(404, {message: 'Reports not found.'});
    } else {
      res.jsonp(200, reports);
    }
  });
};

exports.readReportWeek = function(req, res) {
  if(!req.weeklyReport) {
    res.jsonp(404, {message: 'Weekly Report not found.'});
  } else {
    res.jsonp(200, req.weeklyReport);
  }
};

exports.readReportWeekTotal = function(req, res) {
  Reports.getTotal('week', function(err, total) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(total)) {
      res.jsonp(404, {message: 'Weekly Total Report not found.'});
    } else {
      res.jsonp(200, total);
    }
  });
};

// Reports Month (Read-Only)

exports.findReportByIdMonth = function(req, res, next, id) {
  Reports.get(id, 'month', function(err, report) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(report)) {
      res.jsonp(404, {message: 'Monthly Report with id ' + id + ' not found.'});
    } else {
      req.monthlyReport = report;
      next();
    }
  });
};

exports.readAllReportsMonth = function(req, res) {
  Reports.getAll('month', function(err, reports) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(reports)) {
      res.jsonp(404, {message: 'Reports not found.'});
    } else {
      res.jsonp(200, reports);
    }
  });
};

exports.readReportMonth = function(req, res) {
  if(!req.monthlyReport) {
    res.jsonp(404, {message: 'Monthly Report not found.'});
  } else {
    res.jsonp(200, req.monthlyReport);
  }
};

exports.readReportMonthTotal = function(req, res) {
  Reports.getTotal('month', function(err, total) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(total)) {
      res.jsonp(404, {message: 'Monthly Total Report not found.'});
    } else {
      res.jsonp(200, total);
    }
  });
};
