'use strict';

angular.module('eMarketApp')
    .directive('addAddress', function () {
      return {
        templateUrl: 'views/addAddress.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

