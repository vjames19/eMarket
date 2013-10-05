'use strict';

angular.module('eMarketApp')
    .directive('addBank', function () {
      return {
        templateUrl: 'views/addBank.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

