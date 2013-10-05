'use strict';

angular.module('eMarketApp')
    .directive('profile', function () {
      return {
        templateUrl: 'views/profile.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, Restangular) {
          $scope.users = Restangular.one('api/users', 1).getList();
          $scope.mailAddresses = Restangular.one('api/users', 1).getList('mailAddresses');
          $scope.billAddresses = Restangular.one('api/users', 1).getList('billAddresses');
          $scope.ratings = Restangular.one('api/users', 1).getList('ratings');
        }
      };
    });
