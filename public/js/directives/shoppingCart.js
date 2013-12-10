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

      var statusPopup = page.find('#cart-statusPopup');
      var statusPopupMessage = page.find('#cart-statusPopupMessage');
      var shoppingCartPopup = page.find('#cart-notificationPopup');

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

      scope.selectCart = function(cartItem, index) {
        cartSelected = cartItem;
        selectedCartIndex = index;
      };

      scope.deleteCartItem = function() {
        shoppingCartPopup.off();
        statusPopup.off();
        $.mobile.loading('show');
        User.me().one('cartItems', scope.shoppingCarts[selectedCartIndex].itemId).remove().then(function() {
          scope.shoppingCarts.splice(selectedCartIndex, 1);
          computeTotalCostAndShipping();
          if(scope.shoppingCarts.length === 0) {
            proceedToCheckOut.addClass('ui-disabled');
          }
          Helper.refreshList(shoppingCartList);

          $.mobile.loading('hide');
          shoppingCartPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Product Deleted Successfully From Cart.');
              setTimeout(function() {
                statusPopup.popup('open');
                shoppingCartPopup.off();
              });
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          shoppingCartPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Product Not Deleted Successfully From Cart.');
              setTimeout(function() {
                statusPopup.popup('open');
                shoppingCartPopup.off();
              });
            }
          });
          console.log('Error Removing Product From Cart', err);
        });
      };

      page.on('pagebeforeshow', function() {

        User.me().getList('cartItems').then(function(carts) {
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

      page.on('pageshow', function() {

        statusPopup.off();
        if(scope.shoppingCarts.length === 0) {
          statusPopupMessage.text('No items in cart, please buy some :)');
          statusPopup.popup('open');
        }
      });
    }
  };
});
