'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {
  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
//        Auth.logIn({username: $scope.username, password: $scope.password});
    Auth.logIn({username: 'stuxnet', password: 'stuxnet_pwd'});
    $scope.username = '';
    $scope.password = '';
  };

  // Admins Controllers
  $scope.adminInfoToBeViewed = null;
  $scope.userInfoToBeViewed = null;
  $scope.categoryInfoToBeViewed = null;

  $scope.setAdminInfo = function(adminInfo) {
    $scope.adminInfoToBeViewed = angular.copy(adminInfo);
  };

  $scope.setUserInfo = function(userInfo) {
    $scope.userInfoToBeViewed = angular.copy(userInfo);
  };

  $scope.setCategoryInfo = function(categoryInfo) {
    $scope.categoryInfoToBeViewed = angular.copy(categoryInfo);
  };

});
