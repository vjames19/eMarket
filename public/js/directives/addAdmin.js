'use strict';

angular.module('eMarketApp')
    .directive('addAdmin', function () {
      return {
        templateUrl: 'views/addAdmin.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function ($scope, Restangular) {
          $scope.submit = function () {
            console.log($scope.admin);
            Restangular.all('api/admins').post($scope.admin);
            $.mobile.changePage('#home-admin', {transition: 'fade'});
          };
        }
      };
    });

