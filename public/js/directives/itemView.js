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
            console.log(placeBidInput.attr('value'));
            if (placeBidInput.attr('value')) {
              console.log('here');
              scope.item.productCurrentBidPrice = placeBidInput.attr('value');
              console.log(scope.item.productCurrentBidPrice);
              scope.bid.userId = User.userId;
              console.log(scope.bid.userId);
              scope.bid.productId = scope.item.productId;
              scope.bid.bidAmount = scope.item.productCurrentBidPrice;
              console.log(JSON.stringify(scope.bid));
              var date = new Date();
              scope.bid.bidTime = date.getMonth + 1 + '/' + date.getDay() + '/' + date.getYear() + ' - ' +
                  date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
              User.me().all('bids', User.userId).getList().then(function (bids) {
                if (window._.contains(window._.pluck(bids, 'productId'), scope.bid.productId)) {
                  var bidIdToPost = null;
                  var bidIds = window._.pluck(bids, 'bidId');
                  window._.each(bidIds, function (bidId) {
                    if (window._.contains(window._.pluck(bids, 'productId'), scope.bid.productId)) {
                      bidIdToPost = bidId;
                    }
                  });
                  User.me().one('bids', bidIdToPost).customPUT(scope.bid);
                } else {
                  User.me().all('bids').post(scope.bid);
                }
                $.mobile.changePage('#index-page');
              }); // } };

            }
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
