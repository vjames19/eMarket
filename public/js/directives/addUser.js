'use strict';

angular.module('eMarketApp')
    .directive('addUser', function () {
      return {
        templateUrl: 'views/addUser.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function ($scope, Restangular) {
          $scope.submit = function () {
            console.log($scope.addUser);
            $scope.addUser.userId = window._.keys(Restangular.all('api/users').get()).length + 1;
            Restangular.all('api/users').post($scope.addUser);
            $.mobile.changePage('#home-admin', {transition: 'fade'});
          };
        }
      };
    });

