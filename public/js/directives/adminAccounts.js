'use strict';

angular.module('eMarketApp')
    .directive('adminAccounts', function (Restangular) {
      return {
        templateUrl: 'views/adminAccounts.html',
        restrict: 'E',
        scope: true, // make possible to pass information from this directive to other directive
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var adminAccountList = page.find('#adminAccountList');

          page.on('pagebeforeshow', function() {
            scope.admins = Restangular.all('api/admins').getList();
          });

          page.on('pageshow', function() {
            adminAccountList.listview('refresh');
          });
        }
      };
    });

