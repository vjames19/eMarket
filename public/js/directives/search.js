'use strict';

angular.module('eMarketApp').directive('search', function(Search) {
  return {
    templateUrl: 'views/search.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function($scope, elem) {

      $scope.submitSearch = function() {
        var searchInput = $(elem[0]).find('#search');
        Search.setSearchQuery(searchInput.val());
        $.mobile.changePage('#search-results');
      };

    }
  };
});
