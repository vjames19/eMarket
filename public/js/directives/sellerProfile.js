'use strict';

angular.module('eMarketApp').directive('sellerProfile', function(Restangular, SellerInfo, Helper) {
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
            cancel: true,
            score: function() {
              return $(this).attr('data-score');
            },
            half: true,
            size: 12,
            readOnly: true,
            path: '../lib/raty/lib/img'
          });

          rateSellerBox.raty({
            cancel: true,
            score: function() {
              return $(this).attr('data-score');
            },
            half: true,
            size: 16,
            path: '../lib/raty/lib/img'
          });

          Helper.refreshList(sellerRatingList);

        });

      });

      page.on('pagehide', function() {
        sellerAvgRate.raty('destroy');
      });
    }
  };
});
