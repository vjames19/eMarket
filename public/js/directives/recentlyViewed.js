'use strict';

angular.module('eMarketApp')
  .directive('recentlyViewed', function () {
    return {
      templateUrl: 'views/recentlyViewed.html',
      restrict: 'E',
      scope: true,
      replace: true,
      controller: function($scope, Restangular) {
        $scope.recentlyViewed = Restangular.one('api/users', 1).getList('browsedItems');
      }
    };
  });
