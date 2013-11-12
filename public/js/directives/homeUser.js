'use strict';

angular.module('eMarketApp').directive('homeUser', function(User, Carousel, Helper) {
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

      var carousel = page.find('#homeUser-carousel');

      page.on('pagebeforeshow', function() {

        User.me().getList('carousels').then(function(products) {
          scope.carouselProducts = products;
          Helper.triggerCreate(carousel);
          setTimeout(function() {
            carousel.owlCarousel(Carousel.options);
          });
        });

      });

      page.on('pagehide', function() {

        // unwrap whole plugin and leave original pre carousel structure
        // need this to reload ng-repeat on the new data DON'T DELETE.
        carousel.data('owlCarousel').destroy();

      });

    }
  };
});
