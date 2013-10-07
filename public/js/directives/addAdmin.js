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
            console.log($scope.addAdmin);
            $scope.addAdmin.adminId = window._.keys(Restangular.all('api/admins').getList()).length + 1;
            Restangular.all('api/admins').post($scope.addAdmin);
            $.mobile.changePage('#home-admin', {transition: 'fade'});
          };
        }
      };
    });

