'use strict';

angular.module('eMarketApp').directive('shoppingCart', function(User, Helper) {
  return {
    templateUrl: 'views/shoppingCart.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Product, CartInfo) {

      $scope.setItem = Product.setItem;

      $scope.setCostAndShipping = function(items, cost, shipping) {
        CartInfo.setCartInfo(items, cost, shipping);
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var shoppingCartList = page.find('#cart-shoppingCartList');
      var proceedToCheckOut = page.find('#cart-proceedToCheckoutBtn');

      var cartSelected = null;
      var selectedCartIndex = null;

      scope.cost = 0;
      scope.shipping = 0;

      var computeTotalCostAndShipping = function() {
        scope.cost = 0;
        scope.shipping = 0;
        window._.each(scope.shoppingCarts, function(cart) {
          scope.cost += cart.productTotalPrice;
          scope.shipping += cart.shippingPrice;
        });
      };

      page.on('pagebeforeshow', function() {

        User.me().getList('carts').then(function(carts) {
          scope.shoppingCarts = carts;
          Helper.refreshList(shoppingCartList);
          computeTotalCostAndShipping();
          if(scope.shoppingCarts.length === 0) {
            proceedToCheckOut.addClass('ui-disabled');
          } else {
            proceedToCheckOut.removeClass('ui-disabled');
          }
        });

      });

      scope.selectCart = function(cartItem, index) {
        cartSelected = cartItem;
        selectedCartIndex = index;
      };

      scope.deleteCartItem = function() {
        $.mobile.loading('show');
//        User.me().one('carts', cartSelected.cartId).remove().then(function() {
        scope.shoppingCarts.splice(selectedCartIndex, 1);
        computeTotalCostAndShipping();
        if(scope.shoppingCarts.length === 0) {
          proceedToCheckOut.addClass('ui-disabled');
        }
        Helper.refreshList(shoppingCartList);
        $.mobile.loading('hide');
//        });
      };

    }
  };
});
