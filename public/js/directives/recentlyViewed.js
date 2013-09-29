'use strict';

angular.module('eMarketApp')
  .directive('recentlyViewed', function () {
    return {
      templateUrl: 'views/recentlyViewed.html',
      restrict: 'E',
      scope: {},
      replace: true
    };
  });
