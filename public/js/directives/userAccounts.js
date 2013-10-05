'use strict';

angular.module('eMarketApp')
    .directive('userAccounts', function () {
      return {
        templateUrl: 'views/userAccounts.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

