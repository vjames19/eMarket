'use strict';

angular.module('eMarketApp')
  .directive('sellItem', function () {
    return {
      templateUrl: 'views/sellItem.html',
      restrict: 'E',
      scope: true,
      replace: true,
      link: function(scope, elem, attrs) {
        var page = $(elem[0]);
        var freeShippingCheckbox = page.find('#checkbox-free-shipping');
        var shippingPriceInput = page.find('#shipping-price');

        scope.disableShipping = function() {
          shippingPriceInput.prop('disabled', freeShippingCheckbox.prop('checked'));
        };
      }
    };
  });
