'use strict';

angular.module('eMarketApp').directive('searchResults', function(Restangular, $http, Search, Helper) {
  return {
    templateUrl: 'views/searchResults.html',
    restrict: 'E',
    scope: {},
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
    link: function(scope, elem) {

      var page = $(elem[0]);
      var resultList = page.find('#searchResult-resultList');

      var search = function() {
        $.mobile.loading('show');
        $http.get('api/search', {params: Search.getSearchParams()}).success(function(results) {
          scope.results = results;
          Helper.refreshList(resultList);
          $.mobile.loading('hide');
        });
      };

      scope.submitSearch = function() {
        Search.setSearchQuery(page.find('#searchResults-search').val());
        search();
      };

      page.on('pagebeforeshow', function() {

        search();

      });

    }
  };
});
