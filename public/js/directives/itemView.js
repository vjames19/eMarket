'use strict';

angular.module('eMarketApp')
    .directive('itemView', function (User) {
      return {
        templateUrl: 'views/itemView.html',
        restrict: 'E',
        scope: {
          item: '='
        },
        replace: true,
        link: function (scope, elem) {
          var page = $(elem[0]);
          var popupItemAddedToCart = page.find('#popupItemAddedToCart');
          var buyItNowButton = page.find('#buy-it-now-button');
          var bidButton = page.find('#place-bid-button');
          var placeBidInput = page.find('#placeBid');

          if (scope.item.productSellerId) {
            page.on('pagebeforeshow', function () {
              if (User.userId === scope.item.productSellerId) {
                buyItNowButton.addClass('ui-disabled');
                bidButton.addClass('ui-disabled');
              } else {
                bidButton.removeClass('ui-disabled');
                buyItNowButton.removeClass('ui-disabled');
              }
            });
          }

          scope.placeBid = function () {

          };

          scope.addToCart = function () {
            // Get the item quantity and multiply it by the price to get the total cost
            scope.item.cost = scope.item.quantity * scope.item.productBuyItNowPrice;
            User.me().all('carts').post(scope.item);
          };

          scope.placeMinBid = function () {
            placeBidInput.attr('value', scope.item.productCurrentBidPrice + 5);
          };

        }
      };
    }
)
;
