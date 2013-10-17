'use strict';

module.exports.map = function(object, dictionary) {

  var obj = {};
  if(object && dictionary) {
    Object.keys(dictionary).forEach(function(key) {
      if(object.hasOwnProperty(key)) {
        var renamedKey = dictionary[key];
        obj[renamedKey] = object[key];
      }
    });
  }
  return obj;
};
