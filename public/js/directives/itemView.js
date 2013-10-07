'use strict';

angular.module('eMarketApp')
    .directive('itemView', function(User) {
      return {
        templateUrl: 'views/itemView.html',
        restrict: 'E',
        scope: {
          item: '='
        },
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var popupItemAddedToCart = page.find('#popupItemAddedToCart');
          var buyItNowButton = page.find('#buy-it-now-button');
          var bidButton = page.find('#place-bid-button');

          page.on('pagebeforeshow', function() {
            if(User.userId === scope.item.productSellerId) {
              buyItNowButton.addClass('ui-disabled');
              bidButton.addClass('ui-disabled');
            } else {
              bidButton.removeClass('ui-disabled');
              buyItNowButton.removeClass('ui-disabled');
            }
          });

          page.on('popupafteropen', '.ui-popup', function() {
            setTimeout(function() {
              popupItemAddedToCart.popup('close');
            }, 4000);
          });

          scope.addToCart = function() {
            // Get the item quantity and multiply it by the price to get the total cost
            scope.item.cost = scope.item.quantity * scope.item.productBuyItNowPrice;
            User.me().all('carts').post(scope.item);
          }

        }
      };
    });
