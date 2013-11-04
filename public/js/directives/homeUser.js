'use strict';

angular.module('eMarketApp').directive('homeUser', function(SellItem) {
  return {
    templateUrl: 'views/homeUser.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, Auth) {
      $scope.logOut = Auth.logOut;
    },
    link: function(scope) {
      scope.isDraft = function(isDraft) {
        SellItem.isDraft = isDraft;
      }
    }
  };
});
