'use strict';

angular.module('eMarketApp')
    .directive('categoriesAdmin', function (Restangular) {
      return {
        templateUrl: 'views/categoriesAdmin.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function (scope, elem) {
          var page = $(elem[0]);
          var categoryAdminList = page.find('#categoryAdminList');

          page.on('pagebeforeshow', function () {
            scope.categories = Restangular.all('api/categories').getList();
          });

          page.on('pageshow', function () {
            categoryAdminList.listview('refresh');
          });

        }
      };
    });

