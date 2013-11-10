'use strict';

angular.module('eMarketApp').factory('Search', function() {
  var searchParams = {};
  return {
    setSearchByCategory: function(categoryId) {
      searchParams = {c: categoryId};
    },
    setSearchQuery: function(query) {
      searchParams = {q: query};
    },
    getSearchParams: function() {
      return angular.copy(searchParams);
    }
  };
});
