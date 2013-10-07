'use strict';

angular.module('eMarketApp')
    .directive('categoriesAdmin', function (Restangular) {
      return {
        templateUrl: 'views/categoriesAdmin.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function (scope, elem) {
          var category = null;
          var page = $(elem[0]);
          var categoryAdminList = page.find('#categoryAdminList');

          scope.selectedCategory = function (selectedCategory) {
            category = selectedCategory;
          };

          scope.deleteCategory = function () {
            $.mobile.loading('show');
            Restangular.one('api/categories', category.categoryId).remove();
            $.mobile.loading('hide');
            scope.refreshDom();
          };

          page.on('pagebeforeshow', function () {
            scope.categories = Restangular.all('api/categories').getList();
          });

          page.on('pageshow', function () {
            categoryAdminList.listview('refresh');
          });

        }
      };
    });

