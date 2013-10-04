'use strict';

angular.module('eMarketApp')
  .directive('recentlyViewed', function () {
    return {
      templateUrl: 'views/recentlyViewed.html',
      restrict: 'E',
      scope: {},
      replace: true,
      controller: function($scope) {
        // TODO: Use the recentlyViewed route.
        $scope.recentlyViewed = [
          {productName: 'Samsung TV'},
          {productName: 'Harry Potter and the Sorcerer Stick'},
          {productName: 'Nexus 7 cover'}
        ];
      }
    };
  });
