'use strict';

angular.module('eMarketApp')
  .directive('sellItem', function (Restangular) {
    return {
      templateUrl: 'views/sellItem.html',
      restrict: 'E',
      scope: true,
      replace: true,
      link: function(scope, elem) {
        var page = $(elem[0]);
        var freeShippingCheckbox = page.find('#checkbox-free-shipping');
        var shippingPriceInput = page.find('#shipping-price');

        scope.disableShipping = function() {
          shippingPriceInput.prop('disabled', freeShippingCheckbox.prop('checked'));
        };

        Restangular.all('categories').getList({flat: true}).then(function(categoryList){
          scope.categories = categoryList;
        });

      }
    };
  });
