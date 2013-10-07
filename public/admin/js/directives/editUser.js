'use strict';

angular.module('eMarketApp')
    .directive('editUser', function() {
      return {
        templateUrl: 'views/editUser.html',
        restrict: 'E',
        scope: {
          userInfo: '='
        },
        replace: true,
        controller: function($scope, Restangular) {
          $scope.submit = function() {
            $.mobile.loading('show');
            $scope.userInfo.userPassword = $scope.editUser.userPassword;
            Restangular.one('users', $scope.userInfo.userId).customPUT($scope.userInfo)
                .then(function(userInfo) {
                  $scope.userInfo = userInfo;
                  $.mobile.loading('hide');
                  $.mobile.changePage('#user-accounts');
                }, function(err) {
                  alert(err);
                });
          };
        }
      };
    });

