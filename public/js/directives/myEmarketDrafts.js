'use strict';

angular.module('eMarketApp').directive('myEmarketDrafts', function(User, SellItem, Helper) {
  return {
    templateUrl: 'views/myEmarketDrafts.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {

      $scope.setDraft = SellItem.setDraft;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var draftList = page.find('#draftList');

      page.on('pagebeforeshow', function() {

        User.me().getList('drafts').then(function(drafts) {
          scope.drafts = drafts;
          Helper.refreshList(draftList);
        });

        SellItem.isDraft = true;

      });

    }
  };
});
