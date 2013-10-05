'use strict';

angular.module('eMarketApp')
    .directive('shoppingCart', function () {
      return {
        templateUrl: 'views/shoppingCart.html',
        restrict: 'E',
        scope: true,
        replace: true,
        controller: function($scope, Restangular) {
          var cost = 0;
          var shipping = 0;
          $scope.shoppingCarts = Restangular.one('api/users', 1).getList('carts').then(function (carts) {
            $scope.shoppingCarts = carts;

            for(var i = 0; i < carts.length; i++) {
              cost += carts[i].cost;
              shipping += carts[i].productShippingPrice;
            }
          });

          $scope.getTotalCost = function() {
            return cost;
          }
          $scope.getTotalShipping = function() {
            return shipping;
          }
        }
      };
    });
