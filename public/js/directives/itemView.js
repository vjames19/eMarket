'use strict';

angular.module('eMarketApp')
    .directive('itemView', function () {
      return {
        templateUrl: 'views/itemView.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope) {
          $scope.item = {
            productId: 2,
            productSellerId: 9,
            productCategory: 'computers',
            productName: 'alienware',
            productBuyItNowPrice: 1000.99,
            productStartingBidPrice: 500.99,
            productBidEndDate: '07/07/2008',
            productShippingPrice: 8.99,
            productQuantity: 3,
            productDescription: {
              productCondition: 'Refurbished',
              productPicture: '/img/products/users/9/z98gyu.png',
              productBrand: 'dell',
              productModel: 'M179385',
              productDimensions: '19x30x25'
            },
            productLocation: 'California, USA'
          };

          $scope.remainingTime = $scope.item.endDate;
        }
      };
    });
