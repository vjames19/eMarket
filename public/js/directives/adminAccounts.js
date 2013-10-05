'use strict';

angular.module('eMarketApp')
    .directive('adminAccounts', function () {
      return {
        templateUrl: 'views/adminAccounts.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

