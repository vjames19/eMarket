'use strict';

angular.module('eMarketApp').directive('productBids', function(Restangular, ProductBids) {
  return {
    templateUrl: 'views/productBids.html',
    restrict: 'E',
    scope: true,
    replace: true,
    link: function(scope, elem) {

      var page = $(elem[0]);
      var productBidList = page.find('#productBidsList');

      page.on('pagebeforeshow', function() {

        scope.productId = ProductBids.productId;

        Restangular.one('products', scope.productId).getList('bids').then(function(bids) {
          scope.productBids = bids;
          setTimeout(function(){
            productBidList.listview('refresh');
          });
        });


      });

    }
  };
});
