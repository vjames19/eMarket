'use strict';

angular.module('eMarketApp')
    .directive('loginAdmin', function() {
      return {
        templateUrl: 'views/loginAdmin.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
