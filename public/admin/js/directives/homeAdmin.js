'use strict';

angular.module('eMarketApp')
    .directive('homeAdmin', function() {
      return {
        templateUrl: 'views/homeAdmin.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, Auth) {
          $scope.logOut = Auth.logOut;
        }
      };
    });
