'use strict';

angular.module('eMarketApp')
  .directive('myEmarketDrafts', function () {
    return {
      templateUrl: 'views/myEmarketDrafts.html',
      restrict: 'E',
      scope: {},
      replace: true
    };
  });
