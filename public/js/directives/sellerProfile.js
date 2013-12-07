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

      page.on('pagebeforeshow', function() {

        Restangular.one('users', SellerInfo.sellerId).getList('unsoldProducts').then(function(products) {
          scope.products = products;
          Helper.refreshList(sellerProductList);
        });

        scope.sellerName = SellerInfo.sellerName;
        scope.sellerAvgRate = SellerInfo.sellerAvgRate;

        setTimeout(function() {

          sellerAvgRate.raty({
            score: function() {
              return $(this).attr('data-score');
            },
            size: 12,
            readOnly: true,
            path: '../lib/raty/lib/img'
          });

          rateSellerBox.raty({
            size: 16,
            path: '../lib/raty/lib/img',
            click: function() {
              var score = $(this).raty('score');
              console.log('clicked star', $(this).raty('score'));
              Restangular.one('users', SellerInfo.sellerId).all('ratings')
                  .post({ratedId: SellerInfo.sellerId, raterId: User.userId, value: score});
            }
          });

          Helper.refreshList(sellerRatingList);

        });

      });

      page.on('pagehide', function() {

        sellerAvgRate.raty('destroy');
        rateSellerBox.raty('destroy');

      });

    }
  };
});
