'use strict';

angular.module('eMarketApp').directive('sellerProfile', function(Restangular, SellerInfo, User, Helper) {
  return {
    templateUrl: 'views/sellerProfile.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Product) {

      $scope.setItem = Product.setItem;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var sellerProductList = page.find('#sellerProfile-sellerProductList');
      var sellerRatingList = page.find('#sellerProfile-sellerRatingList');

      var sellerAvgRate = page.find('#sellerProfile-sellerAvgRate');
      var rateSellerBox = page.find('#sellerProfile-rateSeller');

      var statusPopup = page.find('#sellerProfile-statusPopup');
      var statusPopupMessage = page.find('#sellerProfile-statusPopupMessage');

      page.on('pagebeforeshow', function() {

        Restangular.one('sellers', SellerInfo.sellerId).getList('unsoldProducts').then(function(products) {
          scope.products = products;
          Helper.refreshList(sellerProductList);
        }, function(err) {
          scope.products = [];
          Helper.refreshList(sellerProductList);
          console.log('Empty seller products', err);
        });

        var route = 'ratingGivenToSellerByUser';
        var currUser = {userId: User.userId};

        Restangular.one('sellers', SellerInfo.sellerId).customGET(route, currUser).then(function(rating) {
          scope.initialRating = rating.rating;
        });

        scope.sellerName = SellerInfo.sellerName;
        scope.sellerAvgRate = SellerInfo.sellerAvgRate;

        setTimeout(function() {

          sellerAvgRate.raty({
            score: function() {
              return scope.sellerAvgRate;
            },
            size: 12,
            readOnly: true,
            path: '../lib/raty/lib/img'
          });

          rateSellerBox.raty({
            score: function() {
              return scope.initialRating;
            },
            size: 16,
            path: '../lib/raty/lib/img',
            click: function() {

              var newScore = $(this).raty('score');
              var postParams = {ratedId: SellerInfo.sellerId, raterId: User.userId, value: newScore};
              $.mobile.loading('show');
              Restangular.one('sellers', SellerInfo.sellerId).all('ratings').post(postParams).then(function() {

                scope.initialRating = newScore;

                $.mobile.loading('hide');
                statusPopupMessage.text('Rated user successfully.');
                statusPopup.popup('open');

                Restangular.one('sellers', SellerInfo.sellerId).one('avgRating').get().then(function(avg) {

                  scope.sellerAvgRate = avg.avgRating;

                  sellerAvgRate.raty('set', { score: scope.sellerAvgRate });
                  rateSellerBox.raty('set', { score: scope.initialRating });

                  Helper.refreshList(sellerRatingList);

                });

              }, function(err) {

                $.mobile.loading('hide');
                statusPopupMessage.text('Rated user unsuccessfully.');
                statusPopup.popup('open');
                console.log('Rating Error', err);

              });
            }
          });

          if(SellerInfo.sellerId === User.userId) {
            rateSellerBox.raty('readOnly', true);
          } else {
            rateSellerBox.raty('readOnly', false);
          }

        });

      });

      page.on('pagehide', function() {

        sellerAvgRate.raty('destroy');
        rateSellerBox.raty('destroy');

      });

    }
  };
});
