'use strict';

angular.module('eMarketApp')
  .directive('myEmarketSelling', function () {
    return {
      templateUrl: 'views/myEmarketSelling.html',
      restrict: 'E',
      scope: true,
      replace: true,
      controller: function($scope, Restangular) {
        $scope.unsoldProducts = Restangular.one('api/users', 1).getList('unsoldProducts');
        $scope.soldProducts = Restangular.one('api/users', 1).getList('soldProducts');
      }
    };
  });
