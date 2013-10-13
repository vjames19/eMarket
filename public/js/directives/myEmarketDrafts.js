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
        User.me().getList('drafts').then(function(drafts) {
          scope.drafts = drafts;
          setTimeout(function() {
            draftList.listview('refresh');
          });
        });
      });
    }
  };
});
