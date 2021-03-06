'use strict';

angular.module('eMarketApp').directive('sellItemPreview', function(SellItem, Restangular, Helper) {
  return {
    templateUrl: 'views/sellItemPreview.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Restangular, User) {

      var page = $($element[0]);

      var statusPopup = page.find('#sellItemPrev-statusPopup');
      var statusPopupMessage = page.find('#sellItemPrev-statusPopupMessage');

      $scope.submitDraft = function() {
        statusPopup.off();
        $.mobile.loading('show');
        $scope.previewItemInfo.bidEndDate = Helper.formatDate($scope.previewItemInfo.bidEndDate, 'yyyy-MM-dd HH:mm:ss');
        if(SellItem.isDraft) { // Update
          User.me().one('drafts', $scope.previewItemInfo.id).customPUT($scope.previewItemInfo).then(function() {
            $.mobile.loading('hide');
            statusPopupMessage.text('Draft Updated Successfully');
            statusPopup.popup('open');
            statusPopup.on({
              popupafterclose: function() {
                $.mobile.changePage('#my-emarket-drafts');
              }
            });

          }, function(err) {
            $.mobile.loading('hide');
            statusPopupMessage.text('Draft Not Updated Successfully');
            statusPopup.popup('open');
            statusPopup.on({
              popupafterclose: function() {
                $.mobile.changePage('#my-emarket-drafts');
              }
            });
            console.log('Draft Update Error', err);
          });
        }
        else { // Create
          User.me().all('drafts').post($scope.previewItemInfo).then(function() {
            $.mobile.loading('hide');
            statusPopupMessage.text('Draft Created Successfully');
            statusPopup.popup('open');
            statusPopup.on({
              popupafterclose: function() {
                $.mobile.changePage('#home-user');
              }
            });
          }, function(err) {
            $.mobile.loading('hide');
            statusPopupMessage.text('Draft Not Created Successfully');
            statusPopup.popup('open');
            statusPopup.on({
              popupafterclose: function() {
                $.mobile.changePage('#home-user');
              }
            });
            console.log('Draft Creation Error', err);
          });
        }
      };

      $scope.submitProduct = function() {
        statusPopup.off();
        $.mobile.loading('show');
        $scope.previewItemInfo.bidEndDate = Helper.formatDate($scope.previewItemInfo.bidEndDate, 'yyyy-MM-dd HH:mm:ss');
        if(SellItem.isDraft) { // Delete the Draft, New Product
          User.me().one('drafts', $scope.previewItemInfo.id).remove().then(function() {
            $.mobile.loading('hide');
            statusPopupMessage.text('Product Posted Successfully.');
            statusPopup.popup('open');
            statusPopup.on({
              popupafterclose: function() {
                $.mobile.changePage('#my-emarket-drafts');
              }
            });

          }, function(err) {
            $.mobile.loading('hide');
            statusPopupMessage.text('Product Not Posted Successfully');
            statusPopup.popup('open');
            statusPopup.on({
              popupafterclose: function() {
                $.mobile.changePage('#my-emarket-drafts');
              }
            });
            console.log('Draft Remove Error', err);
          });
        }
        else { // No Draft Exists, New Product Only
          Restangular.all('products').post($scope.previewItemInfo).then(function() {
            $.mobile.loading('hide');
            statusPopupMessage.text('Product Posted Successfully.');
            statusPopup.popup('open');
            statusPopup.on({
              popupafterclose: function() {
                $.mobile.changePage('#home-user');
              }
            });

          }, function(err) {
            $.mobile.loading('hide');
            statusPopupMessage.text('Product Not Posted Successfully');
            statusPopup.popup('open');
            statusPopup.on({
              popupafterclose: function() {
                $.mobile.changePage('#home-user');
              }
            });
            console.log('Product Post Error', err);
          });
        }
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      page.on('pagebeforeshow', function() {

        scope.previewItemInfo = SellItem.getItemPreview();

        Restangular.one('categories', scope.previewItemInfo.categoryId).get().then(function(category) {

          scope.previewItemInfo.categoryName = category.categoryName;

        });

      });

    }
  };
});
