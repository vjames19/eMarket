'use strict';

angular.module('eMarketApp').directive('categories', function(Category, Search) {
  return {
    templateUrl: 'views/categories.html',
    restrict: 'E',
    scope: true,
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);
      var upButton = page.find('#up-button');
      var categoryList = page.find('#categoryList');
      var stack = [];

      var refreshList = function(categories) {
        scope.categories = categories;
        setTimeout(function() { // It doesn't work without it -.-
          categoryList.listview('refresh');
        });
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
          refreshList(subCategories);
        } else {
          Search.searchQuery = category.id;
          $.mobile.changePage('#search-results');
        }
      };

      scope.prev = function() {
        stack.pop();
        if(stack.length <= 1) {
          upButton.hide();
        }
        refreshList(window._.last(stack));
      };

      page.on('pagebeforeshow', function() {
        upButton.hide();
        stack = [];
        Category.getList().then(function(categories) {
          scope.categories = categories;
          stack.push(categories);
          setTimeout(function() {
            categoryList.listview('refresh');
          });
        });
      });
    }
  };
});

