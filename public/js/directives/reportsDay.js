'use strict';

angular.module('eMarketApp')
    .directive('reportsDay', function () {
      return {
        templateUrl: 'views/reportsDay.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

