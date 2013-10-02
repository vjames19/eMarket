'use strict';

angular.module('eMarketApp')
    .directive('paymentOptions', function () {
      return {
        templateUrl: 'views/paymentOptions.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
