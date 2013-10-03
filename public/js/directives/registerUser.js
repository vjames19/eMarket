'use strict';

angular.module('eMarketApp')
    .directive('registerUser', function () {
      return {
        templateUrl: 'views/registerUser.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
