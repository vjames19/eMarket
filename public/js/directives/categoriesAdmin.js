'use strict';

angular.module('eMarketApp')
    .directive('categoriesAdmin', function () {
      return {
        templateUrl: 'views/categoriesAdmin.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

