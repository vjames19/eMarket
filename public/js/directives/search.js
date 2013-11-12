'use strict';

angular.module('eMarketApp').directive('search', function(Search) {
  return {
    templateUrl: 'views/search.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function($scope, elem) {

      var page = $(elem[0]);

      $scope.submitSearch = function() {
        Search.setSearchQuery(page.find('.search').val());
        $.mobile.changePage('#search-results');
      };

    }
  };
});
