'use strict';

angular.module('eMarketApp')
    .directive('adminAccounts', function () {
      return {
        templateUrl: 'views/adminAccounts.html',
        restrict: 'E',
        scope: true, // make possible to pass information from this directive to other directive
        replace: true,
        controller: function($scope, Restangular) {
          $scope.admins = Restangular.all('api/admins').getList();
        }
      };
    });

