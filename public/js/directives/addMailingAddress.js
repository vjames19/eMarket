'use strict';

angular.module('eMarketApp')
    .directive('addMailingAddress', function () {
      return {
        templateUrl: 'views/addMailingAddress.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

