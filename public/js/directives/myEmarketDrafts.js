'use strict';

angular.module('eMarketApp')
  .directive('myEmarketDrafts', function () {
    return {
      templateUrl: 'views/myEmarketDrafts.html',
      restrict: 'E',
      scope: {},
      replace: true,
      controller: function ($scope, Restangular) {
        $scope.drafts = Restangular.one('api/users', 1).getList('drafts');
      }
    };
  });
