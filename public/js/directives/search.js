'use strict';

angular.module('eMarketApp')
    .directive('search', function() {
      return {
        templateUrl: 'views/search.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope) {
          $scope.submitSearch = function() {
            $.mobile.changePage('#search-results', {data: $scope.searchQuery});
          };
        }
      };
    });
