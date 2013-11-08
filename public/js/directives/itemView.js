'use strict';

angular.module('eMarketApp').directive('itemView', function(User, Restangular, SellerInfo) {
  return {
    templateUrl: 'views/itemView.html',
    restrict: 'E',
    scope: {
      item: '='
    },
    replace: true,
    controller: function($scope, $filter) {
      $scope.bid = {};
      $scope.submitBid = function() {
        $scope.bid.userId = User.userId;
        $scope.bid.productId = $scope.item.productId;
        $scope.bid.bidTime = $filter('date')(new Date(), 'dd/MM/YYYY:HH:mm:ss Z');
        $scope.bid.productName = $scope.item.productName;
        User.me().all('bids').post($scope.bid);
        $.mobile.changePage('#home-user');
      };
    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var buyItNowButton = page.find('#buy-it-now-button');
      var bidButton = page.find('#place-bid-button');
      var itemListView = page.find('#item-list-view');


      page.on('pagebeforeshow', function() {
        // Set sellerId into a service
        SellerInfo.sellerId = scope.item.sellerId;
        SellerInfo.sellerName = scope.item.sellerName;


        // Remove any state from the bid object.
        scope.bid = {};

        if(scope.item && User.userId === scope.item.productSellerId) {
          buyItNowButton.addClass('ui-disabled');
          bidButton.addClass('ui-disabled');
        } else {
          bidButton.removeClass('ui-disabled');
          buyItNowButton.removeClass('ui-disabled');
        }

        if(scope.item.currentBid < scope.item.startingBidPrice) {
          scope.nextMinBid = scope.item.startingBidPrice + 5;
        }
        else {
          scope.nextMinBid = scope.item.currentBid + 5;
        }

        Restangular.one('users', scope.item.sellerId).one('avgRating').get().then(function(avg) {
          scope.sellerRating = avg;
          SellerInfo.sellerAvgRate = avg.avgRating;

          setTimeout(function() {
            page.find('#avgStarRate').raty({
              cancel: true,
              score: function() {
                return $(this).attr('data-score');
              },
              half: true,
              size: 12,
              readOnly: true,
              path: '../lib/raty/lib/img'
            });
            itemListView.listview('refresh');
          });
        });
      });

      scope.addToCart = function() {
        // Get the item quantity and multiply it by the price to get the total cost
        scope.item.cost = scope.item.quantity * scope.item.productBuyItNowPrice;
        User.me().all('carts').post(scope.item);
      };

      scope.setNextBid = function() {
        scope.bidAmount = scope.nextMinBid;
      };
    }
  };
});
