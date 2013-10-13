'use strict';

angular.module('eMarketApp').directive('myEmarketDrafts', function(User) {
  return {
    templateUrl: 'views/myEmarketDrafts.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);
      var draftList = page.find('#draftList');

      page.on('pagebeforeshow', function() {
        scope.drafts = User.me().getList('drafts').then(function() {
          setTimeout(function() {
            draftList.listview('refresh');
          });
        });
      });
    }
  };
});
