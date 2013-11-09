'use strict';

angular.module('eMarketApp').directive('shoppingCart', function(User) {
  return {
    templateUrl: 'views/shoppingCart.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, Product) {
      $scope.setItem = function(product) {
        Product.item = angular.copy(product);
      }
    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var shoppingCartList = page.find('#shoppingCartList');

      var cartSelected = null;
      var selectedCartIndex = null;

      scope.cost = 0;
      scope.shipping = 0;

      var computeTotalCostAndShipping = function() {
        window._.each(scope.shoppingCarts, function(cart) {
          scope.cost += cart.productTotalPrice;

        });
       window._.each(scope.shoppingCarts, function(cart) {
         scope.shipping += cart.shippingPrice;
        });
      };

      page.on('pagebeforeshow', function() {
        User.me().getList('carts').then(function(carts) {
          scope.shoppingCarts = carts;
          setTimeout(function() {
            shoppingCartList.listview('refresh');
          });
          computeTotalCostAndShipping();
        });
      });

      scope.selectCart = function(cartItem, index) {
        cartSelected = cartItem;
        selectedCartIndex = index;
      };

      scope.deleteCartItem = function() {
        $.mobile.loading('show');
        User.me().one('carts', cartSelected.cartId).remove().then(function() {
          scope.shoppingCarts.splice(selectedCartIndex, 1);
          computeTotalCostAndShipping();
          shoppingCartList.listview('refresh');
          $.mobile.loading('hide');
        });
      };
    }
  };
});
