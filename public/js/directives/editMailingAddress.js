'use strict';

angular.module('eMarketApp')
    .directive('editMailingAddress', function () {
      return {
        templateUrl: 'views/editMailingAddress.html',
        restrict: 'E',
        scope: {
          info: '='
        },
        replace: true
      };
    });

