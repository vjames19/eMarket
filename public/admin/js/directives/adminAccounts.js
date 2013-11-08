'use strict';

angular.module('eMarketApp').directive('adminAccounts', function(Restangular) {
  return {
    templateUrl: 'views/adminAccounts.html',
    restrict: 'E',
    scope: true, // make possible to pass information from this directive to other directive
    replace: true,
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
          adminAccountList.listview('refresh');
          $.mobile.loading('hide');
        });
      };

      page.on('pagebeforeshow', function() {

        Restangular.all('admins').getList().then(function(adminList) {
          scope.admins = adminList;
          setTimeout(function() {
            adminAccountList.listview('refresh');
          });
        });

      });

    }
  };
});

