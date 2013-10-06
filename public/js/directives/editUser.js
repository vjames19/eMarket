'use strict';

angular.module('eMarketApp')
    .directive('editUser', function () {
      return {
        templateUrl: 'views/editUser.html',
        restrict: 'E',
        scope: {
          userInfo: '='
        },
        replace: true,
        controller: function ($scope, Restangular) {
          $scope.submit = function () {
            Restangular.one('api/users', $scope.userInfo.userId).customPUT($scope.userInfo)
                .then(function (userInfo) {
                  $scope.userInfo = userInfo;
                  $.mobile.changePage('#user-accounts');
                }, function (err) {
                  alert(err);
                });
          };
        }
      };
    });

