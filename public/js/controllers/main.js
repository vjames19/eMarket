'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {
  $scope.itemToBeViewed = null;
  $scope.mailInfoToBeViewed = null;
  $scope.billInfoToBeViewed = null;

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

  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
//    Auth.logIn({username: $scope.username, password: $scope.password});
    Auth.logIn({username: 'user', password: 'password'});
    $scope.username = '';
    $scope.password = '';
  };
});
