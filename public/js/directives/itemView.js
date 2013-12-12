'use strict';

angular.module('eMarketApp').directive('itemView',
    function(User, Restangular, ProductBids, SellerInfo, Product, Helper) {
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
            $scope.item.isBidItem = 1;
            $.mobile.loading('show');
            User.me().all('bids').post($scope.item).then(function() {
              $.mobile.loading('hide');
              statusPopup.on({
                popupafterclose: function() {
                  setTimeout(function() {
                    $.mobile.changePage('#home-user');
                  });
                }
              });
              placeBidPopup.on({
                popupafterclose: function() {
                  statusPopupMessage.text('Bid Submitted Successfully');
                  setTimeout(function() {
                    statusPopup.popup('open');
                    placeBidPopup.off();
                  }, 250);
                }
              });
              placeBidPopup.popup('close');
            }, function(err) {
              $.mobile.loading('hide');
              placeBidPopup.on({
                popupafterclose: function() {
                  statusPopupMessage.text('Could not place the bid. Bidding probably has ended.');
                  setTimeout(function() {
                    statusPopup.popup('open');
                    placeBidPopup.off();
                  }, 250);
                }
              });
              placeBidPopup.popup('close');
              console.log('Error bid', err);
            });
          };

          $scope.submitCart = function() {

            statusPopup.off();
            buyItNowPopup.off();

            $scope.item.isBidItem = 0;
            $.mobile.loading('show');
            User.me().all('cartItems').post($scope.item).then(function() {
              $.mobile.loading('hide');
              statusPopup.on({
                popupafterclose: function() {
                  setTimeout(function() {
                    $.mobile.changePage('#home-user');
                  });
                }
              });
              buyItNowPopup.on({
                popupafterclose: function() {
                  statusPopupMessage.text('Product(s) have been placed in cart.');
                  setTimeout(function() {
                    statusPopup.popup('open');
                    buyItNowPopup.off();
                  }, 250);
                }
              });
              buyItNowPopup.popup('close');
            }, function(err) {
              $.mobile.loading('hide');
              buyItNowPopup.on({
                popupafterclose: function() {
                  statusPopupMessage.text('Could not place product in cart.');
                  setTimeout(function() {
                    statusPopup.popup('open');
                    buyItNowPopup.off();
                  }, 250);
                }
              });
              buyItNowPopup.popup('close');
              console.log('Error placing product in cart', err);
            });
          };

        },
        link: function(scope, elem) {

          var page = $(elem[0]);

          var placeBidBtn = page.find('#itemView-placeBidBtn');
          var buyItNowBtn = page.find('#itemView-buyItNowBtn');
          var productBidsLink = page.find('#itemView-productBidsLink');
          //      var buyItNowPopup = page.find('#itemView-buyItNowPopup');
          //      var addedToCartPopup = page.find('#itemView-addedToCartPopup');
          var countdownTimer = page.find('#countdown-timer');

          page.on('pagebeforeshow', function() {

            // Set the product to scope item
            scope.item = {}; // delete any previous values
            scope.item = Product.getItem();
            scope.item.amountToBuy = 1;
            scope.item.isBidItem = null;
            scope.item.bidAmount = null;

            // Set sellerId into a service
            SellerInfo.sellerId = scope.item.sellerId;
            SellerInfo.sellerName = scope.item.sellerName;

            // Remove any state from the other object.
            scope.nextMinBid = null;

            var currentDate = new Date();

            if(new Date(scope.item.bidEndDate) > currentDate && scope.item.quantityRemaining > 0) {
              scope.activateTimer = true;
              var bidEndDateStr = Helper.formatDate(scope.item.bidEndDate, 'yyyy/MM/dd HH:mm:ss');
              countdownTimer.countdown(bidEndDateStr, function(event) {
                countdownTimer.html(event.strftime('%-ww %-dd %Hh %Mm %Ss'));
              });
            } else {
              scope.activateTimer = false;
            }

            if(scope.item && scope.item.currentBid === null) {
              productBidsLink.addClass('ui-disabled');
            } else {
              productBidsLink.removeClass('ui-disabled');
            }

            if(scope.item && User.userId === scope.item.sellerId) {
              buyItNowBtn.addClass('ui-disabled');
              placeBidBtn.addClass('ui-disabled');
            } else {
              if(new Date(scope.item.bidEndDate) < currentDate || scope.item.quantityRemaining <= 0) {
                placeBidBtn.addClass('ui-disabled');
              } else {
                placeBidBtn.removeClass('ui-disabled');
              }
              if(scope.item.quantityRemaining <= 0) {
                buyItNowBtn.addClass('ui-disabled');
              } else {
                buyItNowBtn.removeClass('ui-disabled');
              }
            }

            if(scope.item.currentBid < scope.item.startingBidPrice) {
              scope.nextMinBid = scope.item.startingBidPrice + 5;
            }
            else {
              scope.nextMinBid = scope.item.currentBid + 5;
            }

            Restangular.one('sellers', scope.item.sellerId).one('avgRating').get().then(function(avg) {
              //scope.sellerRating = avg;
              SellerInfo.sellerAvgRate = avg.avgRating;
            });

            User.me().all('browsedItems').post({productId: Product.getItem().id});
          });

          page.on('pagehide', function() {
//            countdownTimer.countdown('destroy');
//            countdownTimer.remove();
          });

          scope.setNextBid = function() {
            scope.item.bidAmount = scope.nextMinBid;
          };

          scope.setProductId = function(productId) {
            ProductBids.productId = productId;
          };

        }
      };
    });
