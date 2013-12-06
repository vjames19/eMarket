'use strict';

angular.module('eMarketApp').directive('itemView', function(User, Restangular, ProductBids, SellerInfo, Product) {
  return {
    templateUrl: 'views/itemView.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $filter, Patterns, $element) {

      $scope.patternPlaceBid = Patterns.item.placeBid;
      $scope.patternBuyItNow = Patterns.item.buyItNow;

      var page = $($element[0]);

      var placeBidPopup = page.find('#itemView-placeBidPopup');
      var buyItNowPopup = page.find('#itemView-buyItNowPopup');

      var statusPopup = page.find('#itemView-statusPopup');
      var statusPopupMessage = page.find('#itemView-statusPopupMessage');

      $scope.submitBid = function() {

        statusPopup.off();
        placeBidPopup.off();
        $.mobile.loading('show');
        $.mobile.loading('hide');
        statusPopup.on({
          popupafterclose: function() {
            $.mobile.changePage('#home-user');
          }
        });
        placeBidPopup.on({
          popupafterclose: function() {
            statusPopupMessage.text('Bid Submitted Successfully');
            setTimeout(function() {
              statusPopup.popup('open');
              placeBidPopup.off();
            });
          }
        });

//        $scope.bid.userId = User.userId;
//        $scope.bid.productId = $scope.item.productId;
//        $scope.bid.bidTime = $filter('date')(new Date(), 'dd/MM/YYYY:HH:mm:ss Z');
//        $scope.bid.productName = $scope.item.productName;
//        User.me().all('bids').post($scope.bid); //TODO <-- add .then
//        $.mobile.loading('hide');
//        $.mobile.changePage('#home-user');
      };

      $scope.submitCart = function() {

        statusPopup.off();
        buyItNowPopup.off();
        $.mobile.loading('show');
        $.mobile.loading('hide');
        statusPopup.on({
          popupafterclose: function() {
            $.mobile.changePage('#home-user');
          }
        });
        buyItNowPopup.on({
          popupafterclose: function() {
            statusPopupMessage.text('Product(s) have been placed in cart.');
            setTimeout(function() {
              statusPopup.popup('open');
              buyItNowPopup.off();
            });
          }
        });

//        $.mobile.loading('hide');
//        $.mobile.changePage('#home-user');
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var placeBidBtn = page.find('#itemView-placeBidBtn');
      var buyItNowBtn = page.find('#itemView-buyItNowBtn');
      var productBidsLink = page.find('#itemView-productBidsLink');
//      var buyItNowPopup = page.find('#itemView-buyItNowPopup');
//      var addedToCartPopup = page.find('#itemView-addedToCartPopup');

      page.on('pagebeforeshow', function() {

        // Set the product to scope item
        scope.item = {}; // delete any previous values
        scope.item = Product.getItem();

        // Set sellerId into a service
        SellerInfo.sellerId = scope.item.sellerId;
        SellerInfo.sellerName = scope.item.sellerName;

        // Remove any state from the other object.
        scope.nextMinBid = null;
        //scope.sellerRating = null;
        scope.bidAmount = null;
        scope.amountToBuy = null;

        if(scope.item && scope.item.currentBid === null) {
          productBidsLink.addClass('ui-disabled');
        } else {
          productBidsLink.removeClass('ui-disabled');
        }

        if(scope.item && User.userId === scope.item.sellerId) {
          buyItNowBtn.addClass('ui-disabled');
          placeBidBtn.addClass('ui-disabled');
        } else {
          placeBidBtn.removeClass('ui-disabled');
          buyItNowBtn.removeClass('ui-disabled');
        }

        if(scope.item.currentBid < scope.item.startingBidPrice) {
          scope.nextMinBid = scope.item.startingBidPrice + 5;
        }
        else {
          scope.nextMinBid = scope.item.currentBid + 5;
        }

        Restangular.one('users', scope.item.sellerId).one('avgRating').get().then(function(avg) {
          //scope.sellerRating = avg;
          SellerInfo.sellerAvgRate = avg.avgRating;
        }, function(err) {
          console.log('Avg Rating Error', err);
          SellerInfo.sellerAvgRate = 0;
        });
      });

//        scope.submitCart = function() {
//          $.mobile.loading('show');
//          quantityPopup.popup('close');
//          // User.me().all('carts').post(scope.item); // TODO <-- add .then later
//          setTimeout(function() {
//            scope.item.cost = scope.item.quantity * scope.item.nonbidPrice;
//            $.mobile.loading('hide');
//            addedToCartPopup.popup('open');
//            setTimeout(function() {
//              addedToCartPopup.popup('close');
//            }, 2000);
//          });
//        };

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
