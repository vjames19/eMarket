'use strict';

angular.module('eMarketApp')
    .directive('profile', function () {
      return {
        templateUrl: 'views/profile.html',
        restrict: 'E',
        scope: true,
        replace: true,
        controller: function($scope, Restangular, User) {
          $scope.user = Restangular.one('api/users', 1).get();
          $scope.mailAddresses = Restangular.one('api/users', 1).getList('mailAddresses');
          $scope.billAddresses = Restangular.one('api/users', 1).getList('billAddresses');
          $scope.ratings = Restangular.one('api/users', 1).getList('ratings');
        }
      };
    });
