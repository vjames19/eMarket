'use strict';

angular.module('eMarketApp').directive('searchResults', function(Restangular, $http, Search) {
  return {
    templateUrl: 'views/searchResults.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, Product) {
      $scope.setItem = Product.setItem;
      $scope.selectedSortOption = null;
      $scope.sortOptions = [
        {name: 'Name', property: 'productName'},
        {name: 'Brand', property: 'brand'},
        {name: 'Price', property: 'nonbidPrice'}
      ];

      $scope.sortBy = function(sortOption) {
        $scope.selectedSortOption = sortOption;
      };
    },
    link: function($scope, elem) {
      var page = $(elem[0]);
      var resultList = page.find('#resultList');
      var search = function() {
        $http.get('api/search', {params: Search.getSearchParams()}).success(function(results) {
          $scope.results = results;
          setTimeout(function() {
            resultList.listview('refresh');
          });
        });
      };

      $scope.submitSearch = function() {
        Search.setSearchQuery(page.find('#search').val());
        search();
      };

      page.on('pagebeforeshow', function() {
        search();
      });
    }
  };
});
