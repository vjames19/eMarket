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
      var adminAccountList = page.find('#adminAcc-adminAccountList');

      var adminAccPopup = page.find('#adminAcc-adminPopupMenu');
      var statusPopup = page.find('#adminAcc-statusPopup');
      var statusPopupMessage = page.find('#adminAcc-statusPopupMessage');

      var selectedAdmin = null;
      var selectedAdminIndex = null;

      scope.selectAdmin = function(admin, index) {
        selectedAdmin = admin;
        selectedAdminIndex = index;
      };

      scope.deleteAdmin = function() {
        adminAccPopup.off();
        statusPopup.off();
        $.mobile.loading('show');
        if(selectedAdmin.username === Admin.adminUserName) {
          $.mobile.loading('hide');
          adminAccPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Cannot Delete yourself!!!');
              setTimeout(function() {
                statusPopup.popup('open');
                adminAccPopup.off();
              }, 250);
            }
          });
          adminAccPopup.popup('close');
          return;
        }
        if(selectedAdmin.username === 'root') {
          $.mobile.loading('hide');
          adminAccPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Cannot Delete Root Ever!!!');
              setTimeout(function() {
                statusPopup.popup('open');
                adminAccPopup.off();
              }, 250);
            }
          });
          adminAccPopup.popup('close');
          return;
        }
        if(selectedAdmin.isRoot === 1 && Admin.isRoot === 0) {
          $.mobile.loading('hide');
          adminAccPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Not enough privileges to delete this admin.');
              setTimeout(function() {
                statusPopup.popup('open');
                adminAccPopup.off();
              }, 250);
            }
          });
          adminAccPopup.popup('close');
          return;
        }
        Restangular.one('admins', selectedAdmin.id).remove().then(function() {
          scope.admins.splice(selectedAdminIndex, 1);
          Helper.refreshList(adminAccountList);
          $.mobile.loading('hide');
          adminAccPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Admin Deleted Successfully.');
              setTimeout(function() {
                statusPopup.popup('open');
                adminAccPopup.off();
              }, 250);
            }
          });
          adminAccPopup.popup('close');
        }, function(err) {
          $.mobile.loading('hide');
          adminAccPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Could not delete admin.');
              setTimeout(function() {
                statusPopup.popup('open');
                adminAccPopup.off();
              }, 250);
            }
          });
          adminAccPopup.popup('close');
          console.log('Error Removing Admin', err);
        });
      };

      page.on('pagebeforeshow', function() {

        Restangular.all('admins').getList().then(function(adminList) {
          scope.admins = adminList;
          Helper.refreshList(adminAccountList);
        }, function(err) {
          scope.admins = [];
          Helper.refreshList(adminAccountList);
          console.log('Empty Admins', err);
        });

      });

    }
  };
});

