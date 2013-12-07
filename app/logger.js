'use strict';

module.exports.logQuery = function(msg, sql) {
  if(process.env.LOG_QUERIES === 'true') {
    console.log(msg, sql);
  }
};
