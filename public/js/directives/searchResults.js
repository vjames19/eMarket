'use strict';

angular.module('eMarketApp')
    .directive('searchResults', function(Restangular) {
      return {
        templateUrl: 'views/searchResults.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var resultList = page.find('#resultList');

          page.on('pagebeforeshow', function(event, searchQuery) {
            //            scope.results = Restangular.customGETLIST('api/search', {q: searchQuery});
            scope.results = Restangular.all('api/products').getList();
          });

          page.on('pageshow', function() {
            resultList.listview('refresh');
          });
        }
      };
    });
