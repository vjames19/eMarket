'use strict';

angular.module('eMarketApp')
    .directive('invoices', function () {
      return {
        templateUrl: 'views/invoices.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
