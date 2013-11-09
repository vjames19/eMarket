'use strict';

angular.module('eMarketApp').directive('categoriesAdmin', function(Restangular, Helper) {
  return {
    templateUrl: 'views/categoriesAdmin.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, CategoryInfo) {
      $scope.setCategoryInfo = function(categoryInfo) {
        CategoryInfo.categoryInfo = angular.copy(categoryInfo);
      };
    },
    link: function(scope, elem) {
      var category = null;
      var selectedIndex = null;
      var page = $(elem[0]);
      var categoryAdminList = page.find('#categoryAdminList');
      var noMore = page.find('#noMore');

      var upButton = page.find('#up-button');
      var stack = [];

      page.on('pagebeforeshow', function() {
        stack = [];
        upButton.hide();
        Restangular.all('categories').getList().then(function(categories) {
          scope.categories = categories;
          stack.push(categories);
        });
      });

      page.on('pageshow', function() {
        categoryAdminList.listview('refresh');
      });

      var refreshCatList = function(categories) {
        scope.categories = categories;
        Helper.refreshList(categoryAdminList);
      };

      scope.next = function(category) {
        if(angular.isArray(category.categories)) {
          upButton.show();
          stack.push(category.categories);
          refreshCatList(category.categories);
        } else {
          noMore.popup('open');
        }
      };

      scope.prev = function() {
        stack.pop();
        if(stack.length <= 1) {
          upButton.hide();
        }
        refreshCatList(window._.last(stack));
      };

      scope.selectedCategory = function(selectedCategory, index) {
        category = selectedCategory;
        selectedIndex = index;
      };

      scope.deleteCategory = function() {
        Restangular.one('categories', category.categoryId).remove().then(function() {
          scope.categories.splice(selectedIndex, 1);
          Helper.refreshList(categoryAdminList, true);
        });
      };

    }
  };
});

