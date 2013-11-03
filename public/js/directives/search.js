'use strict';

angular.module('eMarketApp').directive('search', function(Search) {
  return {
    templateUrl: 'views/search.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function($scope, elem) {
      $scope.submitSearch = function() {
        // It doesn't recognize ng-model -.-
        var searchInput = $(elem[0]).find("#search");
        Search.searchQuery = searchInput.val();
        $.mobile.changePage('#search-results');
      };
    }
  };
});
