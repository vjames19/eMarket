'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {
  $scope.itemToBeViewed = null;
  $scope.mailInfoToBeViewed = null;
  $scope.billInfoToBeViewed = null;
  $scope.cardInfoToBeViewed = null;
  $scope.bankInfoToBeViewed = null;
  $scope.previewItemToSellInfoToBeViewed = null;
  $scope.costToBeViewed = null;
  $scope.shippingToBeViewed = null;
  $scope.itemsAmountToBeViewed = null;

  // Important: Create a deep copy of the item to be passed accross views. To avoid integrity issues.
  // Use to set the item to be viewed
  $scope.setItem = function(item) {
    $scope.itemToBeViewed = angular.copy(item);
  };

  $scope.setMailInfo = function(mailInfo) {
    $scope.mailInfoToBeViewed = angular.copy(mailInfo);
  };

  $scope.setBillInfo = function(billInfo) {
    $scope.billInfoToBeViewed = angular.copy(billInfo);
  };

  $scope.setCardInfo = function(cardInfo) {
    $scope.cardInfoToBeViewed = angular.copy(cardInfo);
  };

  $scope.setBankInfo = function(bankInfo) {
    $scope.bankInfoToBeViewed = angular.copy(bankInfo);
  };

  $scope.setPreviewItemInfo = function(itemInfo) {
    $scope.previewItemToSellInfoToBeViewed = angular.copy(itemInfo);
  };

  $scope.setCostAndShipping = function(items, cost, shipping) {
    $scope.itemsAmountToBeViewed = items;
    $scope.costToBeViewed = cost;
    $scope.shippingToBeViewed = shipping;
  };

  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
    //        Auth.logIn({username: $scope.username, password: $scope.password});
    Auth.logIn({username: 'juanba', password: 'juanba_pwd'});
    $scope.username = '';
    $scope.password = '';
  };

  $scope.refreshDom = function() {
    $.mobile.changePage(
        window.location.href,
        {
          allowSamePageTransition: true,
          transition: 'none',
          showLoadMsg: false,
          reloadPage: true
        }
    );
  };

});
