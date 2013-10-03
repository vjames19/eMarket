'use strict';

angular.module('eMarketApp')
    .directive('forgotPassword', function () {
      return {
        templateUrl: 'views/forgotPassword.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

