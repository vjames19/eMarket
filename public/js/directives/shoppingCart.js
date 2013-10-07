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
          var shoppingCartList = page.find('#shoppingCartList')

          var cartSelected = null;

          page.on('pagebeforeshow', function() {
            var cost = 0;
            var shipping = 0;
            scope.shoppingCarts = User.me().getList('carts').then(function (carts) {
              scope.shoppingCarts = carts;
              for(var i = 0; i < carts.length; i++) {
                cost += carts[i].cost;
                shipping += carts[i].productShippingPrice;
              }
            });
            scope.getTotalCost = function() {
              return cost;
            };
            scope.getTotalShipping = function() {
              return shipping;
            };

          });



          scope.sendCart = function(cartItem) {
            cartSelected = cartItem;
          }

          scope.deleteCartItem = function() {
            $.mobile.loading('show');
            User.me().one('carts', cartSelected.cartId).remove();
            $.mobile.loading('hide');
            scope.refreshDom();
          }

          page.on('pageshow', function() {
            shoppingCartList.listview('refresh');
          });



        }
      };
    });
