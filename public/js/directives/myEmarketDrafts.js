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

      var draftList = page.find('#myEmDrafts-draftList');

      var statusPopup = page.find('#myEmDrafts-statusPopup');
      var statusPopupMessage = page.find('#myEmDrafts-statusPopupMessage');

      var promise = null;

      page.on('pagebeforeshow', function() {

        promise = User.me().getList('drafts');
        promise.then(function(drafts) {
          scope.drafts = drafts;
          Helper.refreshList(draftList);
        }, function(err) {
          scope.drafts = [];
          Helper.refreshList(draftList);
          console.log('Empty Draft', err);
        });

      });

      page.on('pageshow', function() {

        statusPopup.off();
        promise.then(function(drafts) {
          if(drafts.length === 0) {
            setTimeout(function() {
              statusPopupMessage.text('No drafts found.');
              statusPopup.popup('open');
            });
          }
        }, function() {
          setTimeout(function() {
            statusPopupMessage.text('No drafts found.');
            statusPopup.popup('open');
          });
        });

      });

    }
  };
});
