'use strict';

angular.module('eMarketApp')
    .directive('register', function () {
      return {
        templateUrl: 'views/register.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
