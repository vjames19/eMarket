'use strict';

angular.module('eMarketApp').directive('homeUser', function(User, Carousel) {
  return {
    templateUrl: 'views/homeUser.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Auth, SellItem, Product) {
      $scope.logOut = Auth.logOut;

      $scope.setItem = Product.setItem;

      $scope.isDraft = function(isDraft) {
        SellItem.isDraft = angular.copy(isDraft);
      };
    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var carousel = page.find('#owl-example');

      page.on('pagebeforeshow', function() {

        User.me().getList('carousels').then(function(products) {
          scope.carouselProducts = products;
        });

        $(document).ready(function() {
          carousel.owlCarousel(Carousel.options);
        });

      });
    }
  };
});
