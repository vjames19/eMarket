'use strict';

angular.module('eMarketApp')
    .directive('editBillingAddress', function () {
      return {
        templateUrl: 'views/editBillingAddress.html',
        restrict: 'E',
        scope: {
          info: '='
        },
        replace: true
      };
    });

