'use strict';

angular.module('eMarketApp')
  .directive('sellItem', function () {
    return {
      templateUrl: 'views/sellItem.html',
      restrict: 'E',
      scope: {},
      replace: true
    };
  });
