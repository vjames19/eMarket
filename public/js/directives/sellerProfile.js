'use strict';

angular.module('eMarketApp').directive('sellerProfile', function(Restangular, SellerInfo) {
  return {
    templateUrl: 'views/sellerProfile.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);
      var sellerProductList = page.find('#sellerProductList');

      page.on('pagebeforeshow', function() {
        Restangular.one('users', SellerInfo.sellerId).getList('unsoldProducts').then(function(products) {
          scope.products = products;
          setTimeout(function() {
            sellerProductList.listview('refresh');
          });
        });
        scope.sellerName = SellerInfo.sellerName;
        scope.sellerAvgRate = SellerInfo.sellerAvgRate;

        setTimeout(function() {
          page.find('#sellerAvgRate').raty({
            cancel: true,
            score: function() {
              return $(this).attr('data-score');
            },
            half: true,
            size: 12,
            readOnly: true,
            path: '../lib/raty/lib/img'
          });
          sellerProductList.listview('refresh');
        });
      });

      page.find('#rateSeller').raty({
        cancel: true,
        score: function() {
          return $(this).attr('data-score');
        },
        half: true,
        size: 16,
        path: '../lib/raty/lib/img'
      });
    }
  };
});