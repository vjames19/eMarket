'use strict';

angular.module('eMarketApp').directive('categories', function(Category, Search, Helper) {
  return {
    templateUrl: 'views/categories.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem) {

      var page = $(elem[0]);
      var upButton = page.find('#categories-upButton');
      var categoryList = page.find('#categories-categoryList');
      var stack = [];

      var refreshCatList = function(categories) {
        scope.categories = categories;
        Helper.refreshList(categoryList);
      };

      scope.next = function(category) {
        var subCategories = category.categories;
        if(angular.isArray(subCategories) && subCategories.length > 0) {
          subCategories = subCategories.slice(0);
          var parentCategory = angular.copy(category);
          parentCategory.categoryName = 'Search all ' + category.categoryName;
          parentCategory.categories = null;
          subCategories.unshift(parentCategory);
          upButton.show();
          stack.push(subCategories);
          refreshCatList(subCategories);
        } else {
          Search.setSearchByCategory(category.id);
          $.mobile.changePage('#search-results');
        }
      };

      scope.prev = function() {
        stack.pop();
        if(stack.length <= 1) {
          upButton.hide();
        }
        refreshCatList(window._.last(stack));
      };

      page.on('pagebeforeshow', function() {
        upButton.hide();
        stack = [];
        Category.getList().then(function(categories) {
          scope.categories = categories;
          stack.push(categories);
          Helper.refreshList(categoryList);
        });
      });

    }
  };
});

