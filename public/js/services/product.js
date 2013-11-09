'use strict';

angular.module('eMarketApp').factory('Product', function() {

  var item = {};
  return {
    setItem: function(product) {
      item = angular.copy(product);
    },
    getItem: function() {
      return item;
    }
  };
});
