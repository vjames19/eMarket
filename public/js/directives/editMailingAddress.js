'use strict';

angular.module('eMarketApp')
    .directive('editMailingAddress', function () {
      return {
        templateUrl: 'views/editMailingAddress.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

