'use strict';

angular.module('eMarketApp')
    .directive('shoppingCart', function (User) {
      return {
        templateUrl: 'views/shoppingCart.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var shoppingCartList = page.find('#shoppingCartList');

          var cost = null;
          var shipping = null;

          var cartSelected = null;
          var selectedCartIndex = null;

          page.on('pagebeforeshow', function() {
            cost = 0;
            shipping = 0;
            scope.shoppingCarts = User.me().getList('carts').then(function (carts) {
              scope.shoppingCarts = carts;
              for(var i = 0; i < carts.length; i++) {
                cost += carts[i].cost;
                shipping += carts[i].productShippingPrice;
              }
            });

          });

          scope.getTotalCost = function() {
            return cost;
          };
          scope.getTotalShipping = function() {
            return shipping;
          };

          scope.selectCart = function(cartItem, index) {
            cartSelected = cartItem;
            selectedCartIndex = index;
          };

          scope.deleteCartItem = function() {
            $.mobile.loading('show');
            User.me().one('carts', cartSelected.cartId).remove().then(function () {
              scope.shoppingCarts.splice(selectedCartIndex, 1);
              shoppingCartList.listview('refresh');
              $.mobile.loading('hide');
            });
          };

          page.on('pageshow', function() {
            cost = 0;
            shipping = 0;
            for(var i = 0; i < scope.shoppingCarts.length; i++) {
              cost += scope.shoppingCarts[i].cost;
              shipping += scope.shoppingCarts[i].productShippingPrice;
            }
            shoppingCartList.listview('refresh');

          });
        }
      };
    });
