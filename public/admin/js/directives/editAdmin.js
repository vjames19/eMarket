'use strict';

angular.module('eMarketApp').directive('editAdmin', function(AdminInfo, Helper) {
  return {
    templateUrl: 'views/editAdmin.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular) {
      $scope.submit = function() {
        $.mobile.loading('show');
        $scope.adminInfo.adminPassword = $scope.editAdmin.adminPassword;
        Restangular.one('admins', $scope.adminInfo.adminId).customPUT($scope.adminInfo).then(function(adminInfo) {
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

        scope.adminInfo = AdminInfo.adminInfo;

        if(scope.adminInfo.isRoot === 1) {
          Helper.refreshCheckBox(rootCheckBox.prop('checked', true), true);
        } else {
          Helper.refreshCheckBox(rootCheckBox.prop('checked', false), true);
        }
      });

    }
  };
});

