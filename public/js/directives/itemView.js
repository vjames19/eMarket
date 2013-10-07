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
        controller: function ($scope) {
          $scope.submitBid = function () {
            var date = new Date();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var time = hours + ':' + minutes + ':' + seconds;
            var zone = 'EST';
            var dateFormatted = (('' + month).length < 2 ? '0' : '') + month + '/' +
                (('' + day).length < 2 ? '0' : '') + day + '/' + year;
            var timeStamp = dateFormatted + ':' + time + ' ' + zone;
            $scope.bid.userId = User.userId;
            $scope.bid.productId = $scope.item.productId;
            $scope.bid.bidTime = timeStamp;
            User.me().all('bids').post($scope.bid).then(function () {
              $.mobile.changePage('#index-page');
            });
          };
        },
        link: function (scope, elem) {
          var page = $(elem[0]);
//          var popupItemAddedToCart = page.find('#popupItemAddedToCart');
          var buyItNowButton = page.find('#buy-it-now-button');
          var bidButton = page.find('#place-bid-button');
//          var placeBidInput = page.find('#placeBid');

          page.on('pagebeforeshow', function () {
            if (scope.item && User.userId === scope.item.productSellerId) {
              buyItNowButton.addClass('ui-disabled');
              bidButton.addClass('ui-disabled');
            } else {
              bidButton.removeClass('ui-disabled');
              buyItNowButton.removeClass('ui-disabled');
            }
          });

          scope.addToCart = function () {
            // Get the item quantity and multiply it by the price to get the total cost
            scope.item.cost = scope.item.quantity * scope.item.productBuyItNowPrice;
            User.me().all('carts').post(scope.item);
          };

          scope.placeMinBid = function () {
            scope.bid.bidAmount = scope.item.productCurrentBidPrice + 5;
          };

        }
      };
    }
);
