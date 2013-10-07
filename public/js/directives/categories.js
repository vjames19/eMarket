'use strict';

angular.module('eMarketApp')
  .directive('categories', function (Category) {
    return {
      templateUrl: 'views/categories.html',
      restrict: 'E',
      scope: {},
      replace: true,
      link: function(scope, elem) {
        var page = $(elem[0]);
        var categoryList = page.find('#categoryList');

        page.on('pagebeforeshow', function() {
          scope.categories = Category.getList();
        });

        page.on('pageshow', function() {
          categoryList.listview('refresh');
        });
      }
    };
  });

