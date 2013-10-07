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
            Restangular.all('api/users').post($scope.addUser);
            $.mobile.changePage('#user-accounts', {transition: 'fade'});
          };
        }
      };
    });

