'use strict';

angular.module('eMarketApp')
    .directive('editCard', function () {
      return {
        templateUrl: 'views/editCard.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

