'use strict';

angular.module('eMarketApp')
    .controller('MainCtrl', function($scope) {
      $scope.itemToBeViewed = null;
      // Use to set the item to be viewed
      $scope.setItem = function(item) {
        $scope.itemToBeViewed = item;
      };
    });
