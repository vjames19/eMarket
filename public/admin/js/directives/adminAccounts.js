'use strict';

angular.module('eMarketApp').directive('adminAccounts', function(Restangular, Helper) {
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
        Restangular.one('admins', selectedAdmin.adminId).remove().then(function() {
          scope.admins.splice(selectedAdminIndex, 1);
          Helper.refreshList(adminAccountList, true);
          $.mobile.loading('hide');
        });
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

