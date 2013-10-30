'use strict';

angular.module('eMarketApp').directive('searchResults', function(Restangular, $http) {
  return {
    templateUrl: 'views/searchResults.html',
    restrict: 'E',
    scope: {
      searchQuery: '='
    },
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);
      var resultList = page.find('#resultList');

      page.on('pagebeforeshow', function(event, data) {
        var searchInput = data.prevPage.find("#search");
        var searchQuery = searchInput.val();
        $http.get('api/search', {params: {q: searchQuery}}).success(function(results) {
          scope.results = results;
          setTimeout(function() {
            resultList.listview('refresh');
          });
          searchInput.val("");
        });
      });
    }
  };
});
