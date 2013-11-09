'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {

  $scope.itemToBeViewed = null;
  $scope.previewItemToSellInfoToBeViewed = null;
  $scope.costToBeViewed = null;
  $scope.shippingToBeViewed = null;
  $scope.itemsAmountToBeViewed = null;
  $scope.draftToBeViewed = null;
  $scope.isDraftToBeViewed = null;

  // Important: Create a deep copy of the item to be passed accross views. To avoid integrity issues.
  // Use to set the item to be viewed
  $scope.setItem = function(item) {
    $scope.itemToBeViewed = angular.copy(item);
  };

  $scope.setCostAndShipping = function(items, cost, shipping) {
    $scope.itemsAmountToBeViewed = angular.copy(items);
    $scope.costToBeViewed = angular.copy(cost);
    $scope.shippingToBeViewed = angular.copy(shipping);
  };

  $scope.setDraft = function(draft) {
    $scope.draftToBeViewed = angular.copy(draft);
  };

  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
    // Auth.logIn({username: $scope.username, password: $scope.password});
    Auth.logIn({username: 'juanba', password: 'juanba_pwd'});
    $scope.username = '';
    $scope.password = '';
  };

});
