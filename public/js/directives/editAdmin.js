'use strict';

angular.module('eMarketApp')
    .directive('editAdmin', function () {
      return {
        templateUrl: 'views/editAdmin.html',
        restrict: 'E',
        scope: {
          adminInfo: '='
        },
        replace: true,
        controller: function($scope, Restangular) {
          $scope.submit = function() {
            Restangular.one('api/admins', $scope.adminInfo.adminId).customPUT($scope.adminInfo)
                .then(function(adminInfo) {
                   $scope.adminInfo = adminInfo;
                }, function(err) {
                    alert(err);
                });

          };
        }
      };
    });

