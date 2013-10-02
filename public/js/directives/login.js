'use strict';

angular.module('eMarketApp')
    .directive('login', function () {
      return {
        templateUrl: 'views/login.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
