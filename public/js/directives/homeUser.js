'use strict';

angular.module('eMarketApp').directive('homeUser', function(Restangular, User, Carousel, Helper) {
  return {
    templateUrl: 'views/homeUser.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Auth, SellItem, Product) {

      $scope.eMarketLogo = '/img/logo.png';

      $scope.logOut = Auth.logOut;

      $scope.setItem = Product.setItem;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var carousel = page.find('#homeUser-carousel');

      page.on('pagebeforeshow', function() {

        Restangular.all('carousels').getList({userId: User.userId}).then(function(products) {
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
