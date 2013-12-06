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

      page.on('pagebeforeshow', function() {

        User.me().getList('drafts').then(function(drafts) {
          scope.drafts = drafts;
          Helper.refreshList(draftList);
        });

      });

      page.on('pageshow', function() {

        statusPopup.off();
        if(scope.drafts.length === 0) {
          statusPopupMessage.text('No drafts found.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#my-emarket-buying');
            }
          });
        }

      });

    }
  };
});
