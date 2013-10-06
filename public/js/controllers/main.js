'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {
  $scope.itemToBeViewed = null;
  $scope.mailInfoToBeViewed = null;
  $scope.billInfoToBeViewed = null;
  $scope.cardInfoToBeViewed = null;
  $scope.bankInfoToBeViewed = null;
  $scope.previewItemToSellInfoToBeViewed = null;

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

  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
    //    Auth.logIn({username: $scope.username, password: $scope.password});
    Auth.logIn({username: 'user', password: 'password'});
    $scope.username = '';
    $scope.password = '';
  };

  // Admins Controllers
  $scope.adminInfoToBeViewed = null;
  $scope.userInfoToBeViewed = null;

  $scope.setAdminInfo = function(adminInfo) {
    $scope.adminInfoToBeViewed = adminInfo;
  };

  $scope.setUserInfo = function(userInfo) {
    $scope.userInfoToBeViewed = userInfo;
  };
});
