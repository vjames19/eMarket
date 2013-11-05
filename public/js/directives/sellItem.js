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

      page.on('pagebeforeshow', function() {

        scope.disableShipping = function() {
          shippingPriceInput.prop('disabled', freeShippingCheckbox.prop('checked'));
        };

        Category.getList({flat: true}).then(function(categoryList) {
          scope.categories = categoryList;
        });

        if(!SellItem.isDraft) {
          scope.item = null;
        }

        scope.setPreviewItemInfo = function(item) {
          SellItem.itemPreview = item;
        };

      });

    }
  };
});
