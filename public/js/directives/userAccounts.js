'use strict';

angular.module('eMarketApp')
    .directive('userAccounts', function () {
      return {
        templateUrl: 'views/userAccounts.html',
        restrict: 'E',
        scope: true,
        replace: true,
        controller: function($scope, Restangular) {
          $scope.users = Restangular.all('api/users').getList();
        }
      };
    });

