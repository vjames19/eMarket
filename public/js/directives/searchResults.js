'use strict';

angular.module('eMarketApp').directive('searchResults', function(Restangular, $http, Search) {
  return {
    templateUrl: 'views/searchResults.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function($scope, elem) {
      var page = $(elem[0]);
      var resultList = page.find('#resultList');
      var search = function() {
        $http.get('api/search', {params: {q: Search.searchQuery}}).success(function(results) {
          $scope.results = results;
          setTimeout(function() {
            resultList.listview('refresh');
          });
        });
      };

      $scope.submitSearch = function() {
        Search.searchQuery = page.find('#search').val();
        search();
      };

      page.on('pagebeforeshow', function() {
        search();
      });
    }
  };
});
