'use strict';

angular.module('eMarketApp').directive('sellItem', function(Category, SellItem) {
  return {
    templateUrl: 'views/sellItem.html',
    restrict: 'E',
    scope: {
      item: '='
    },
    replace: true,
    link: function(scope, elem) {

      var page = $(elem[0]);
      var freeShippingCheckbox = page.find('#checkbox-free-shipping');
      var shippingPriceInput = page.find('#shipping-price');

      var newCheckBox = page.find('#radio-choice-new');
      var UsedCheckBox = page.find('#radio-choice-used');
      var RefurbishedCheckBox = page.find('#radio-choice-refurbished');

      page.on('pagebeforeshow', function() {

        scope.disableShipping = function() {
          shippingPriceInput.prop('disabled', freeShippingCheckbox.prop('checked'));
          scope.item.shippingPrice = 0;
        };

        Category.getList({flat: true}).then(function(categoryList) {
          scope.categories = categoryList;
        });

        if(!SellItem.isDraft) {
          scope.item = {};
        }

        scope.setPreviewItemInfo = function(item) {
          SellItem.itemPreview = item;
        };

        if(SellItem.isDraft && scope.item.condition === 'New') {
          setTimeout(function() {
            newCheckBox.prop('checked', true).checkboxradio('refresh');
            UsedCheckBox.prop('checked', false).checkboxradio('refresh');
            RefurbishedCheckBox.prop('checked', false).checkboxradio('refresh');
          });
        } else if(SellItem.isDraft && scope.item.condition === 'Used') {
          setTimeout(function() {
            newCheckBox.prop('checked', false).checkboxradio('refresh');
            UsedCheckBox.prop('checked', true).checkboxradio('refresh');
            RefurbishedCheckBox.prop('checked', false).checkboxradio('refresh');
          });
        } else if(SellItem.isDraft && scope.item.condition === 'Refurbished') {
          setTimeout(function() {
            newCheckBox.prop('checked', false).checkboxradio('refresh');
            UsedCheckBox.prop('checked', false).checkboxradio('refresh');
            RefurbishedCheckBox.prop('checked', true).checkboxradio('refresh');
          });
        } else {
          setTimeout(function() {
            newCheckBox.prop('checked', false).checkboxradio('refresh');
            UsedCheckBox.prop('checked', false).checkboxradio('refresh');
            RefurbishedCheckBox.prop('checked', false).checkboxradio('refresh');
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
