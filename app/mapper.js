'use strict';

var _ = require('underscore');
var mapObject = function(object, dictionary) {

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

module.exports.map = mapObject;

module.exports.mapCollection = function(collection, dictionary) {
  return _.map(collection, function(object) {
    return mapObject(object, dictionary);
  });
};
