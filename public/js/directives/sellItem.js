'use strict';

angular.module('eMarketApp')
  .directive('sellItem', function () {
    return {
      templateUrl: 'views/sellItem.html',
      restrict: 'E',
      scope: true,
      replace: true,
      controller: function($scope) {

      },
      link: function(scope, elem) {
        var page = $(elem[0]);
        var freeShippingCheckbox = page.find('#checkbox-free-shipping');
        var shippingPriceInput = page.find('#shipping-price');

        if(freeShippingCheckbox.checked) {
          shippingPriceInput.prop('disabled', true);

        }
        else {
          shippingPriceInput.prop('disabled', false);
        }
      }
    };
  });
