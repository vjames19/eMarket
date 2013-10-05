'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {
  $scope.itemToBeViewed = null;
  $scope.mailInfoToBeViewed = null;
  $scope.billInfoToBeViewed = null;
  $scope.cardInfoToBeViewed = null;
  $scope.bankInfoToBeViewed = null;

  // Use to set the item to be viewed
  $scope.setItem = function(item) {
    $scope.itemToBeViewed = item;
  };

  $scope.setMailInfo = function(mailInfo) {
    $scope.mailInfoToBeViewed = mailInfo;
  };

  $scope.setBillInfo = function(billInfo) {
    $scope.billInfoToBeViewed = billInfo;
  };

  $scope.setCardInfo = function(cardInfo){
    $scope.cardInfoToBeViewed = cardInfo;
  };

  $scope.setBankInfo = function(bankInfo){
    $scope.bankInfoToBeViewed = bankInfo;
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
  }

  $scope.setUserInfo = function(userInfo) {
    $scope.userInfoToBeViewed = userInfo;
  }




});
