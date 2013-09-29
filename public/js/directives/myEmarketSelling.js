'use strict';

angular.module('eMarketApp')
  .directive('myEmarketSelling', function () {
    return {
      templateUrl: 'views/myEmarketSelling.html',
      restrict: 'E',
      scope: {},
      replace: true
    };
  });
