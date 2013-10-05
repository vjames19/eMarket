'use strict';

angular.module('eMarketApp')
    .directive('editUser', function () {
      return {
        templateUrl: 'views/editUser.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

