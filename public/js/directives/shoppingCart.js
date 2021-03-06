'use strict';

angular.module('eMarketApp').directive('shoppingCart', function(User, Helper) {
  return {
    templateUrl: 'views/shoppingCart.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Product, CartInfo) {

      $scope.setItem = function(cartProduct) {
        var copy = angular.copy(cartProduct);
        copy.id = copy.productId;
        Product.setItem(copy);
      };

      $scope.setCostAndShipping = function(items, cost, shipping) {
        CartInfo.setCartInfo(items, cost, shipping);
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var shoppingCartList = page.find('#cart-shoppingCartList');
      var proceedToCheckOut = page.find('#cart-proceedToCheckoutBtn');
      var deleteCartItemBtn = page.find('#cart-deleteItemCartBtn');

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
          if(cart.isBidItem) {
            scope.cost += cart.productTotalBidPrice;
          } else {
            scope.cost += cart.productTotalNonBidPrice;
          }
          scope.shipping += cart.shippingPrice;
        });
      };

      scope.selectCart = function(cartItem, index) {
        cartSelected = cartItem;
        selectedCartIndex = index;

        if(scope.shoppingCarts[selectedCartIndex].isBidItem) { // Check if it is a bid item
          deleteCartItemBtn.addClass('ui-disabled');
        } else {
          deleteCartItemBtn.removeClass('ui-disabled');
        }
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
              }, 250);
            }
          });
          shoppingCartPopup.popup('close');
        }, function(err) {
          $.mobile.loading('hide');
          shoppingCartPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Product Not Deleted Successfully From Cart.');
              setTimeout(function() {
                statusPopup.popup('open');
                shoppingCartPopup.off();
              }, 250);
            }
          });
          shoppingCartPopup.popup('close');
          console.log('Error Removing Product From Cart', err);
        });
      };

      var promise = null;

      page.on('pagebeforeshow', function() {

        promise = User.me().getList('cartItems');
        promise.then(function(carts) {
          scope.shoppingCarts = carts;
          Helper.refreshList(shoppingCartList);
          computeTotalCostAndShipping();
          if(scope.shoppingCarts.length === 0) {
            proceedToCheckOut.addClass('ui-disabled');
          } else {
            proceedToCheckOut.removeClass('ui-disabled');
          }
        }, function(err) {
          scope.shoppingCarts = [];
          computeTotalCostAndShipping();
          Helper.refreshList(shoppingCartList);
          console.log('Empty Cart', err);
        });
      });

      page.on('pageshow', function() {

        statusPopup.off();
        promise.then(function(shoppingCarts) {
          if(shoppingCarts.length === 0) {
            setTimeout(function() {
              statusPopupMessage.text('No items in cart, please buy some :)');
              statusPopup.popup('open');
            });
          }
        }, function() {
          setTimeout(function() {
            statusPopupMessage.text('No items in cart, please buy some :)');
            statusPopup.popup('open');
          });
        });

      });
    }
  };
});
