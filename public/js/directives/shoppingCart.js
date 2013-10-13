'use strict';

angular.module('eMarketApp').directive('shoppingCart', function(User) {
  return {
    templateUrl: 'views/shoppingCart.html',
    restrict: 'E',
    scope: true,
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);
      var shoppingCartList = page.find('#shoppingCartList');

      var cartSelected = null;
      var selectedCartIndex = null;

      scope.cost = 0;
      scope.shipping = 0;

      page.on('pagebeforeshow', function() {
        scope.shoppingCarts = User.me().getList('carts').then(function(carts) {
          scope.shoppingCarts = carts;

          computeTotalCostAndShipping();
        });
      });

      scope.selectCart = function(cartItem, index) {
        cartSelected = cartItem;
        selectedCartIndex = index;
      }

      var computeTotalCostAndShipping = function() {
        scope.cost = 0;
        scope.shipping = 0;
        for(var i = 0; i < scope.shoppingCarts.length; i++
            ) {
          scope.cost += scope.shoppingCarts[i].cost;
          scope.shipping += scope.shoppingCarts[i].productShippingPrice;
        }
      }

      scope.deleteCartItem = function() {
        $.mobile.loading('show');
        User.me().one('carts', cartSelected.cartId).remove().then(function() {
          scope.shoppingCarts.splice(selectedCartIndex, 1);
          computeTotalCostAndShipping();
          shoppingCartList.listview('refresh');
          $.mobile.loading('hide');
        });
      }

      page.on('pageshow', function() {
        shoppingCartList.listview('refresh');
      });
    }
  };
});
