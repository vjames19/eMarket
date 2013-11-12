'use strict';

var _ = require('underscore');

module.exports.map = function(object, dictionary) {
  var obj = {};
  if(!_.isEmpty(object) && !_.isEmpty(dictionary)) {
    Object.keys(dictionary).forEach(function(key) {
      if(object.hasOwnProperty(key)) {
        var renamedKey = dictionary[key];
        obj[renamedKey] = object[key];
      }
    });
  }
  return obj;
};

module.exports.mapCollection = function(collection, dictionary) {
  return _.map(collection, function(object) {
    return module.exports.map(object, dictionary);
  });
};
