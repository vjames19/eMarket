'use strict';

angular.module('eMarketApp')
    .directive('editBank', function () {
      return {
        templateUrl: 'views/editBank.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

