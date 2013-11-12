'use strict';

angular.module('eMarketApp').directive('adminAccounts', function(Restangular, Helper, Admin) {
  return {
    templateUrl: 'views/adminAccounts.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, AdminInfo) {

      $scope.setAdminInfo = function(adminInfo) {
        AdminInfo.adminInfo = angular.copy(adminInfo);
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var adminAccountList = page.find('#adminAccountList');

      var selectedAdmin = null;
      var selectedAdminIndex = null;

      scope.selectAdmin = function(admin, index) {
        selectedAdmin = admin;
        selectedAdminIndex = index;
      };

      scope.deleteAdmin = function() {
        $.mobile.loading('show');
//        Restangular.one('admins', selectedAdmin.adminId).remove().then(function() {
        if(selectedAdmin.isRoot === 0 && selectedAdmin.username !== Admin.adminUserName) {
          // Non-Root Cannot Delete Root Admins or themselves Ever!
          scope.admins.splice(selectedAdminIndex, 1);
          Helper.refreshList(adminAccountList);
        }
        // Root Cannot Be Deleted Ever but Root people can delete other root people
        else if(Admin.isRoot === 1 && selectedAdmin.username !== 'root' &&
            selectedAdmin.username !== Admin.adminUserName) {
          scope.admins.splice(selectedAdminIndex, 1);
          Helper.refreshList(adminAccountList);
        }
        $.mobile.loading('hide');
//        });
      };

      page.on('pagebeforeshow', function() {

        Restangular.all('admins').getList().then(function(adminList) {
          scope.admins = adminList;
          Helper.refreshList(adminAccountList);
        });

      });

    }
  };
});

