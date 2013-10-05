'use strict';

angular.module('eMarketApp')
    .directive('editAddress', function () {
      return {
        templateUrl: 'views/editAddress.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

