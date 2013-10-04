'use strict';

angular.module('eMarketApp').factory('Category', function(Restangular) {
  return Restangular.all('api/categories');
});
