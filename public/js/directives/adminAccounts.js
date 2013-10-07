'use strict';

angular.module('eMarketApp')
    .directive('adminAccounts', function (Restangular) {
      return {
        templateUrl: 'views/adminAccounts.html',
        restrict: 'E',
        scope: true, // make possible to pass information from this directive to other directive
        replace: true,
        link: function (scope, elem) {
          var admin = null;
          var page = $(elem[0]);
          var adminAccountList = page.find('#adminAccountList');

          scope.selectedAdmin = function (selectedAdmin) {
            admin = selectedAdmin;
          };

          scope.deleteAdmin = function () {
            $.mobile.loading('show');
            Restangular.one('api/admins', admin.adminId).remove();
            $.mobile.loading('hide');
            scope.refreshPage();
          };

          page.on('pagebeforeshow', function () {
            scope.admins = Restangular.all('api/admins').getList();
          });

          page.on('pageshow', function () {
            adminAccountList.listview('refresh');
          });

          scope.refreshPage = function() {
            $.mobile.changePage(
                window.location.href,
                {
                  allowSamePageTransition : true,
                  transition              : 'none',
                  showLoadMsg             : false,
                  reloadPage              : true
                }
            );
          };


        }
      };
    });

