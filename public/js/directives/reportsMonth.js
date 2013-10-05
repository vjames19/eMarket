'use strict';

angular.module('eMarketApp')
    .directive('reportsMonth', function () {
      return {
        templateUrl: 'views/reportsMonth.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

