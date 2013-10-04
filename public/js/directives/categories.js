'use strict';

angular.module('eMarketApp')
  .directive('categories', function () {
    return {
      templateUrl: 'views/categories.html',
      restrict: 'E',
      scope: {},
      replace: true,
      controller: function($scope, Category) {
        $scope.categories = Category.getList();
      }
    };
  });

