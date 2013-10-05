'use strict';

angular.module('eMarketApp')
    .directive('reports', function () {
      return {
        templateUrl: 'views/reports.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

