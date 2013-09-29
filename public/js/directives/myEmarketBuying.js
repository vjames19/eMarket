'use strict';

angular.module('eMarketApp')
  .directive('myEmarketBuying', function () {
    return {
      templateUrl: 'views/myEmarketBuying.html',
      restrict: 'E',
      scope: {},
      replace: true
    };
  });

