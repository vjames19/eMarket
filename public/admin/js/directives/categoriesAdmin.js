'use strict';

angular.module('eMarketApp')
    .directive('categoriesAdmin', function(Restangular) {
      return {
        templateUrl: 'views/categoriesAdmin.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function(scope, elem) {
          var category = null;
          var selectedIndex = null;
          var page = $(elem[0]);
          var categoryAdminList = page.find('#categoryAdminList');

          scope.selectedCategory = function(selectedCategory, index) {
            category = selectedCategory;
            selectedIndex = index;
          };

          scope.deleteCategory = function() {
            Restangular.one('categories', category.categoryId).remove().then(function() {
              scope.categories.splice(selectedIndex, 1);
              categoryAdminList.listview('refresh');
            });
          };

          page.on('pagebeforeshow', function() {
            Restangular.all('categories').getList().then(function(categories) {
              scope.categories = categories;
            });
          });

          page.on('pageshow', function() {
            categoryAdminList.listview('refresh');
          });

        }
      };
    });

