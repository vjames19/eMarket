'use strict';

angular.module('eMarketApp')
    .controller('MainCtrl', function($scope) {
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
    });
