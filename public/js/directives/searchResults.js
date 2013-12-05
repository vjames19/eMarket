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

      var statusPopup = page.find('#searchResult-statusPopup');
      var statusPopupMessage = page.find('#searchResult-statusPopupMessage');

      var search = function(done) {
        $.mobile.loading('show');
        scope.results = {};
        done(false);
        $http.get('api/search', {params: Search.getSearchParams()}).success(function(results) {
          scope.results = results;
          Helper.refreshList(resultList);
          $.mobile.loading('hide');
          done(true);
        });
      };

      scope.submitSearch = function() {

        Search.setSearchQuery(page.find('#searchResults-search').val());

        // Here for future searches.
        search(function(done) {

          if(done) {

            if(scope.results.length === 0) {
              statusPopupMessage.text('No Results Found, Please Try Again.');
              statusPopup.popup('open');
            }

          }

        });

      };

      page.on('pagebeforeshow', function() {

        search(function() {

        });

      });

      page.on('pageshow', function() {

        // Here for first search.
        setTimeout(function() {
          console.log(scope.results);
          if(scope.results.length === 0) {
            statusPopupMessage.text('No Results Found, Please Try Again.');
            statusPopup.popup('open');
          }
        });

      });

    }
  };
});
