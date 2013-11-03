'use strict';

angular.module('eMarketApp')
    .directive('editAdmin', function() {
      return {
        templateUrl: 'views/editAdmin.html',
        restrict: 'E',
        scope: {
          adminInfo: '='
        },
        replace: true,
        controller: function($scope, Restangular) {
          $scope.submit = function() {
            $.mobile.loading('show');
            $scope.adminInfo.adminPassword = $scope.editAdmin.adminPassword;
            Restangular.one('admins', $scope.adminInfo.adminId).customPUT($scope.adminInfo)
                .then(function(adminInfo) {
                  $scope.adminInfo = adminInfo;
                  $.mobile.loading('hide');
                  $.mobile.changePage('#admin-accounts');
                }, function(err) {
                  alert(err);
                });

          };
        },
        link: function(scope, elem) {
          var page = $(elem[0]);
          var rootCheckBox = page.find('#make-root');
          page.on('pagebeforeshow', function() {
            if(scope.adminInfo.isRoot === 1) {
              rootCheckBox.prop('checked', true).checkboxradio('refresh');
            } else {
              rootCheckBox.prop('checked', false).checkboxradio('refresh');
            }
          });
        }
      };
    });

