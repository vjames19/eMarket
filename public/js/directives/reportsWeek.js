'use strict';

angular.module('eMarketApp')
    .directive('reportsWeek', function () {
      return {
        templateUrl: 'views/reportsWeek.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

