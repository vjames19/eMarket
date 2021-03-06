'use strict';

angular.module('eMarketApp').directive('sellItem', function(Category, SellItem, Helper) {
  return {
    templateUrl: 'views/sellItem.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Patterns) {

      $scope.patternPicture = Patterns.item.picture;
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

      var page = $($element[0]);

      var statusPopup = page.find('#sellItem-statusPopup');
      var statusPopupMessage = page.find('#sellItem-statusPopupMessage');

      $scope.validateItem = function(item) {

        var dateToValidate = Helper.formatDate(item.bidEndDate, 'yyyy-MM-ddTHH:mm:ss');
        var currDate = new Date();
        var validDate = currDate.setDate(currDate.getDate() + 1);
        if(new Date(dateToValidate) < validDate) {
          statusPopupMessage.text('Invalid Date. Bid End Date has to last at least 24 hours.');
          statusPopup.popup('open');
          return;
        }

        SellItem.setItemPreview(item);
        SellItem.setDraft(item);

        $.mobile.changePage('#sell-item-preview');

      };

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
              url: 'api/pictures',
              method: 'post',
              parallelUploads: 1,
              maxFiles: 1,
              maxFilesize: 4, // MB
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
                  if(!tempFile) {
                    tempFile = file;
                  } else {
                    this.removeFile(tempFile);
                    tempFile = file;
                  }
                });
                this.on('removedfile', function() {
                  tempFile = null;
                  if(scope.item.picture) {
                    delete scope.item.picture;
                    scope.$digest();
                  }
                });
                this.on('success', function(file, newFileName) {
                  console.log('Current Picture Name ', newFileName);
                  scope.item.picture = '/pictures/' + newFileName;
                  scope.showPicture = false;
                  scope.$digest();
                });
              }
            }
        );

      });

      page.on('pagehide', function() {

        dropZone.removeAllFiles(true);

      });

      page.on('pagebeforeshow', function() {

        scope.item = SellItem.getDraft();

        scope.showPicture = scope.item.picture;

        setTimeout(function() {
          Helper.refreshSelect(conditionSelect);
          if(SellItem.isDraft) {
            scope.item.bidEndDate = Helper.formatDate(scope.item.bidEndDate, 'yyyy-MM-ddTHH:mm:ss');
            freeShippingCheckbox.prop('checked', scope.item.shippingPrice === 0).checkboxradio('refresh');
          } else {
            freeShippingCheckbox.prop('checked', false).checkboxradio('refresh');
          }
        });

        Category.getList({flat: true}).then(function(categoryList) {

          scope.categories = categoryList;
          Helper.refreshSelect(categorySelect);

        });

        scope.disableShipping = function() {
          shippingPriceInput.prop('disabled', freeShippingCheckbox.prop('checked'));
          scope.item.shippingPrice = 0;
        };

      });

    }
  };
});
