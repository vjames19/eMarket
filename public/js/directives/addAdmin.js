'use strict';

angular.module('eMarketApp')
    .directive('addAdmin', function () {
      return {
        templateUrl: 'views/addAdmin.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

