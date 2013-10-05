'use strict';

angular.module('eMarketApp').factory('User', function() {
  return {
    username: null,
    userId: null,
    isDefined: function() {
      return username && userId;
    }
  };
});
