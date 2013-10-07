'use strict';

angular.module('eMarketApp')
    .directive('categories', function(Category) {
      return {
        templateUrl: 'views/categories.html',
        restrict: 'E',
        scope: {},
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
            }, 1);
          };

          scope.next = function(category) {
            if(angular.isArray(category.categories)) {
              upButton.show();
              stack.push(category.categories);
              refreshList(category.categories);
            } else {
              $.mobile.changePage('#search-results', {q: category.categoryName});
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
            scope.categories = Category.getList();
            stack.push(scope.categories);
          });

          page.on('pageshow', function() {
            categoryList.listview('refresh');
          });
        }

      };
    });

