'use strict';

angular.module('eMarketApp')
    .directive('addBillingAddress', function () {
      return {
        templateUrl: 'views/addBillingAddress.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

