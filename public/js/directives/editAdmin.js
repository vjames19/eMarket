'use strict';

angular.module('eMarketApp')
    .directive('editAdmin', function () {
      return {
        templateUrl: 'views/editAdmin.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

