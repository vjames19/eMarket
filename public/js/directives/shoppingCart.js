'use strict';

angular.module('eMarketApp')
    .directive('shoppingCart', function () {
      return {
        templateUrl: 'views/shoppingCart.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
