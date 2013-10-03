'use strict';

angular.module('eMarketApp')
    .directive('homeAdmin', function () {
      return {
        templateUrl: 'views/homeAdmin.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
