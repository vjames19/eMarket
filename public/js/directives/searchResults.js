'use strict';

angular.module('eMarketApp').directive('searchResults', function(Restangular) {
  return {
    templateUrl: 'views/searchResults.html',
    restrict: 'E',
    scope: true,
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);
      var resultList = page.find('#resultList');

      page.on('pagebeforeshow', function(event, searchQuery) {
        //            scope.results = Restangular.customGETLIST('search', {q: searchQuery});
        Restangular.all('products').getList().then(function(results) {
          scope.results = results;
          setTimeout(function() {
            resultList.listview('refresh');
          });
        });
      });
    }
  };
});
