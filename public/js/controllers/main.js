'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {

  $scope.costToBeViewed = null;
  $scope.shippingToBeViewed = null;
  $scope.itemsAmountToBeViewed = null;

  // Important: Create a deep copy to avoid integrity issues.
  $scope.setCostAndShipping = function(items, cost, shipping) {
    $scope.itemsAmountToBeViewed = angular.copy(items);
    $scope.costToBeViewed = angular.copy(cost);
    $scope.shippingToBeViewed = angular.copy(shipping);
  };

  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
    // Auth.logIn({username: $scope.username, password: $scope.password});
    Auth.logIn({username: 'juanba', password: 'juanba_pwd'});
    $scope.username = '';
    $scope.password = '';
  };

});
