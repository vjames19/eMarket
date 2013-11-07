'use strict';

angular.module('eMarketApp').directive('homeUser', function(SellItem, User) {
  return {
    templateUrl: 'views/homeUser.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, Auth) {
      $scope.logOut = Auth.logOut;
    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var carousel = page.find('#owl-example');

      page.on('pagebeforeshow', function() {
        User.me().getList('carousels').then(function(products) {
          scope.carouselProducts = products;
        });

        $(document).ready(function() {
          carousel.owlCarousel({
            items : 5,
            itemsDesktop : [1199,4],
            itemsDesktopSmall : [980,3],
            itemsTablet: [768,3],
            itemsTabletSmall: false,
            itemsMobile : [479,2],
            singleItem : false,
            itemsScaleUp : false,

            //Basic Speeds
            slideSpeed : 200,
            paginationSpeed : 800,
            rewindSpeed : 1000,

            //Autoplay
            autoPlay : false,
            stopOnHover : false,

            // Navigation
            navigation : false,
            navigationText : ["prev","next"],
            rewindNav : true,
            scrollPerPage : false,

            //Pagination
            pagination : true,
            paginationNumbers: false,

            // Responsive
            responsive: true,
            responsiveRefreshRate : 200,
            responsiveBaseWidth: window,

            // CSS Styles
            baseClass : "../lib/OwlCarousel-master/owl-carousel",
            theme : "../lib/OwlCarousel-master/owl-carousel/owl-theme",

            //Lazy load
            lazyLoad : false,
            lazyFollow : true,
            lazyEffect : "fade",

            //Auto height
            autoHeight : false,

            //JSON
            jsonPath : false,
            jsonSuccess : false,

            //Mouse Events
            dragBeforeAnimFinish : true,
            mouseDrag : true,
            touchDrag : true,

            //Transitions
            transitionStyle : false,

            // Other
            addClassActive : false,

            //Callbacks
            beforeUpdate : false,
            afterUpdate : false,
            beforeInit: false,
            afterInit: false,
            beforeMove: false,
            afterMove: false,
            afterAction: false,
            startDragging : false
          });
        });
      });




      scope.isDraft = function(isDraft) {
        SellItem.isDraft = isDraft;
      }
    }
  };
});
