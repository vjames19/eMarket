'use strict';

angular.module('eMarketApp').directive('itemView', function(User, Restangular, ProductBids, SellerInfo, Product, Helper) {
  return {
    templateUrl: 'views/itemView.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $filter) {

      $scope.submitBid = function() {
        $.mobile.loading('show');
//        $scope.bid.userId = User.userId;
//        $scope.bid.productId = $scope.item.productId;
//        $scope.bid.bidTime = $filter('date')(new Date(), 'dd/MM/YYYY:HH:mm:ss Z');
//        $scope.bid.productName = $scope.item.productName;
//        User.me().all('bids').post($scope.bid); //TODO <-- add .then
        $.mobile.loading('hide');
        $.mobile.changePage('#home-user');
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var buyItNowButton = page.find('#buy-it-now-button');
      var bidButton = page.find('#place-bid-button');
      var productBidsBtn = page.find('#product-bids-btn');
      var addedToCartPopup = page.find('#popupItemAddedToCart');
      var quantityPopup = page.find('#popupQuantity');

      page.on('pagebeforeshow', function() {

        // Set the product to scope item
        scope.item = {}; // delete any previous values
        scope.item = Product.getItem();

        // Set sellerId into a service
        SellerInfo.sellerId = scope.item.sellerId;
        SellerInfo.sellerName = scope.item.sellerName;

        // Remove any state from the other object.
        scope.nextMinBid = null;
        scope.sellerRating = null;
        scope.bidAmount = null;
        scope.amountToBuy = null;

        if(scope.item && scope.item.currentBid === null) {
          productBidsBtn.addClass('ui-disabled');
        } else {
          productBidsBtn.removeClass('ui-disabled');
        }

        if(scope.item && User.userId === scope.item.sellerId) {
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

        });

        scope.submitCart = function() {
          $.mobile.loading('show');
          quantityPopup.popup('close');
          // User.me().all('carts').post(scope.item); // TODO <-- add .then later
          setTimeout(function() {
            scope.item.cost = scope.item.quantity * scope.item.nonbidPrice;
            $.mobile.loading('hide');
            addedToCartPopup.popup('open');
            setTimeout(function() {
              addedToCartPopup.popup('close');
            }, 2000);
          });
        };

      });

//      scope.addToCart = function() {
      // Get the item quantity and multiply it by the price to get the total cost
//        scope.item.cost = scope.item.quantity * scope.item.productBuyItNowPrice;
      // User.me().all('carts').post(scope.item);
//      };

      scope.setNextBid = function() {
        scope.bidAmount = scope.nextMinBid;
      };

      scope.setProductId = function(productId) {
        ProductBids.productId = productId;
      };

    }
  };
});
