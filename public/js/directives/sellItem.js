'use strict';

angular.module('eMarketApp').directive('sellItem', function(Category, SellItem, Helper, $filter) {
  return {
    templateUrl: 'views/sellItem.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Patterns) {

      $scope.patternTitle = Patterns.item.title;
      $scope.patternBrand = Patterns.item.brand;
      $scope.patternModel = Patterns.item.model;
      $scope.patternDimension = Patterns.item.dimension;
      $scope.patternDescription = Patterns.item.description;
      $scope.patternBidPrice = Patterns.item.bidPrice;
      $scope.patternNonBidPrice = Patterns.item.nonBidPrice;
      $scope.patternQuantity = Patterns.item.quantity;
      $scope.patternEndDate = Patterns.item.endDate;
      $scope.patternShipping = Patterns.item.shipping;

      $scope.setPreviewItemInfo = SellItem.setItemPreview;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var dropZone = null;

      var freeShippingCheckbox = page.find('#sellItem-freeShipping');
      var shippingPriceInput = page.find('#sellItem-shippingPrice');

      var categorySelect = page.find('#sellItem-categorySelect');
      var conditionSelect = page.find('#sellItem-conditionSelect');

      var pictureSelector = page.find('#sellItem-addImage');

      page.on('pageinit', function() {

        pictureSelector.dropzone({
              url: 'pictures',
              method: 'post',
              parallelUploads: 1,
              maxFiles: 1,
              maxFilesize: 1, // MB
              paramName: 'file',
              addRemoveLinks: true,
              acceptedFiles: 'image/*',
              previewsContainer: '.dropzone-previews',
              clickable: true,
              createImageThumbnails: true,
              thumbnailWidth: 150,
              thumbnailHeight: 150,
              uploadMultiple: false,
              accept: function(file, done) {
                return done();
              },
              init: function() {
                dropZone = this; // Important to be able to get object outside this container...
                var tempFile;
                this.on('addedfile', function(file) {
                  console.log('added a file');
                  if(!tempFile) {
                    tempFile = file;
                  } else {
                    this.removeFile(tempFile);
                    tempFile = file;
                  }
                });
                this.on('removedfile', function() {
                  console.log('removedFile');
                  tempFile = null;
                });
              }
            }
        );

      });

      page.on('pagehide', function() {

        dropZone.removeAllFiles(true);

      });

      page.on('pagebeforeshow', function() {

        if(!SellItem.isDraft) {
          scope.item = {};
          SellItem.setDraft({});
        }

        Category.getList({flat: true}).then(function(categoryList) {
          scope.categories = categoryList;

          scope.item = SellItem.getDraft();

          if(!SellItem.isDraft) {
            scope.item = {condition: 'New'};
          }

          if(SellItem.isDraft) {

            // Format for datetime-local input correct display
            scope.item.bidEndDate = $filter('date')(new Date(scope.item.bidEndDate), 'yyyy-MM-ddTHH:mm:ss');

            if(scope.item.shippingPrice !== null) {
              freeShippingCheckbox.prop('checked', scope.item.shippingPrice === 0).checkboxradio('refresh');
            } else {
              freeShippingCheckbox.prop('checked', false).checkboxradio('refresh');
            }

          }

          Helper.refreshSelect(categorySelect);
          Helper.refreshSelect(conditionSelect);

        });

        scope.disableShipping = function() {
          shippingPriceInput.prop('disabled', freeShippingCheckbox.prop('checked'));
          scope.item.shippingPrice = 0;
        };

      });

    }
  };
});
