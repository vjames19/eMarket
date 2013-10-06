'use strict';

angular.module('eMarketApp')
    .directive('userAccounts', function (Restangular) {
      return {
        templateUrl: 'views/userAccounts.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var userAccountList = page.find('#userAccountList');

          page.on('pagebeforeshow', function() {
             scope.users = Restangular.all('api/users').getList();
          });

          page.on('pageshow', function() {
            userAccountList.listview('refresh');
          });

        }
      };
    });

