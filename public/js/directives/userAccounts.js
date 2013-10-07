'use strict';

angular.module('eMarketApp')
    .directive('userAccounts', function (Restangular) {
      return {
        templateUrl: 'views/userAccounts.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function (scope, elem) {
          var user = null;
          var page = $(elem[0]);
          var userAccountList = page.find('#userAccountList');

          scope.selectedUser = function (selectedUser) {
            user = selectedUser;
          };

          scope.deleteUser = function () {
            $.mobile.loading('show');
            Restangular.one('api/users', user.userId).remove();
            $.mobile.loading('hide');
            scope.refreshDom();
          };

          page.on('pagebeforeshow', function () {
            scope.users = Restangular.all('api/users').getList();
          });

          page.on('pageshow', function () {
            userAccountList.listview('refresh');
          });

        }
      };
    });

