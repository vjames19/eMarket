'use strict';

angular.module('eMarketApp').directive('sellItem', function(Category, SellItem, Helper, $filter) {
  return {
    templateUrl: 'views/sellItem.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {

      $scope.setPreviewItemInfo = SellItem.setItemPreview;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var freeShippingCheckbox = page.find('#sellItem-freeShipping');
      var shippingPriceInput = page.find('#sellItem-shippingPrice');

      var newCheckBox = page.find('#sellItem-conditionNew');
      var usedCheckBox = page.find('#sellItem-conditionUsed');
      var refurbishedCheckBox = page.find('#sellItem-conditionRefurbished');

      var categoryPopup = page.find('#sellItem-categoryPopup');
      var descriptionPopup = page.find('#sellItem-descriptionPopup');

      var pictureSelector = page.find('#add-image');

      var setPreviewTemplate = function() {
        return '<div id="dz-thumb" class="dz-preview dz-file-preview">' +
            '<div class="dz-details">' +
            '<div class="dz-filename"><span data-dz-name></span></div>' +
            '<div class="dz-size" data-dz-size></div>' +
            '<img data-dz-thumbnail />' +
            '</div>' +
            '<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>' +
            '<div class="dz-success-mark"></div>' +
            '<div class="dz-error-mark"></div>' +
            '<div class="dz-error-message"></div>' +
            '</div>';
//        Default
//        '<div class="dz-preview dz-file-preview">' +
//            '<div class="dz-details">' +
//            '<div class="dz-filename"><span data-dz-name></span></div>' +
//            '<div class="dz-size" data-dz-size></div>' +
//            '<img data-dz-thumbnail />' +
//            '</div>' +
//            '<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>' +
//            '<div class="dz-success-mark"><span>✔</span></div>' +
//            '<div class="dz-error-mark"><span>✘</span></div>' +
//            '<div class="dz-error-message"><span data-dz-errormessage></span></div>' +
//        '</div>'
      };

      page.on('pageshow', function() {

        pictureSelector.dropzone({
              url: 'pictures',
              method: 'post',
              parallelUploads: 1,
              maxFiles: 1,
              maxFilesize: 1, // MB
              paramName: 'file',
              addRemoveLinks: false,
              previewsContainer: null,
              clickable: true,
              createImageThumbnails: true,
              thumbnailWidth: 150,
              thumbnailHeight: 150,
              uploadMultiple: false,
              accept: function(file, done) {
                return done();
              },
              previewTemplate: setPreviewTemplate(),
              init: function() {
                this.on('maxfilesexceeded', function(file) {
                  this.removeFile(file);
                });
              }
            }
        );

      });

      page.on('pagehide', function() {

        // For now until full functionality is implemented
        page.find('div[id*="dz-thumb"]').remove();

      });

      page.on('pagebeforeshow', function() {

        categoryPopup.on({
          popupbeforeposition: function() {
            var maxHeight = $.mobile.window.innerHeight() / 1.25;
            if(categoryPopup.height() > maxHeight) {
              categoryPopup.css('overflow-y', 'scroll');
              categoryPopup.height(maxHeight);
            }
          }
        });

        descriptionPopup.on({
          popupbeforeposition: function() {
            var maxHeight = $.mobile.window.innerHeight() / 1.25;
            if(descriptionPopup.height() > maxHeight) {
              descriptionPopup.css('overflow-y', 'scroll');
              descriptionPopup.height(maxHeight);
            }
          }
        });

        if(!SellItem.isDraft) {
          scope.item = {};
          SellItem.setDraft({});
        }

        // Get Draft if it is a a draft, if not set an empty object
        scope.item = SellItem.getDraft();

        if(SellItem.isDraft) {

          // Format for datetime-local input correct display
          scope.item.bidEndDate = $filter('date')(new Date(scope.item.bidEndDate), 'yyyy-MM-ddTHH:mm:ss');

        }

        scope.disableShipping = function() {
          shippingPriceInput.prop('disabled', freeShippingCheckbox.prop('checked'));
          scope.item.shippingPrice = 0;
        };

        Category.getList({flat: true}).then(function(categoryList) {
          scope.categories = categoryList;
          Helper.triggerCreate(categoryPopup);
        });

        if(SellItem.isDraft && scope.item.condition === 'New') {
          setTimeout(function() {
            newCheckBox.prop('checked', true).checkboxradio('refresh');
            usedCheckBox.prop('checked', false).checkboxradio('refresh');
            refurbishedCheckBox.prop('checked', false).checkboxradio('refresh');
          });
        } else if(SellItem.isDraft && scope.item.condition === 'Used') {
          setTimeout(function() {
            newCheckBox.prop('checked', false).checkboxradio('refresh');
            usedCheckBox.prop('checked', true).checkboxradio('refresh');
            refurbishedCheckBox.prop('checked', false).checkboxradio('refresh');
          });
        } else if(SellItem.isDraft && scope.item.condition === 'Refurbished') {
          setTimeout(function() {
            newCheckBox.prop('checked', false).checkboxradio('refresh');
            usedCheckBox.prop('checked', false).checkboxradio('refresh');
            refurbishedCheckBox.prop('checked', true).checkboxradio('refresh');
          });
        } else {
          setTimeout(function() {
            newCheckBox.prop('checked', false).checkboxradio('refresh');
            usedCheckBox.prop('checked', false).checkboxradio('refresh');
            refurbishedCheckBox.prop('checked', false).checkboxradio('refresh');
          });
        }

        if(SellItem.isDraft && scope.item.shippingPrice === 0) {
          setTimeout(function() {
            freeShippingCheckbox.prop('checked', true).checkboxradio('refresh');
          });
        } else {
          setTimeout(function() {
            freeShippingCheckbox.prop('checked', false).checkboxradio('refresh');
          });
        }

      });

    }
  };
});
