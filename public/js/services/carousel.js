'use strict';

angular.module('eMarketApp').factory('Carousel', function() {
  return {
    'options': {
      items: 5,
      itemsDesktop: [850, 5],
      itemsDesktopSmall: [705, 4],
      itemsTablet: [560, 3],
      itemsTabletSmall: [415, 2],
      itemsMobile: [270, 1],
      singleItem: false,
      itemsScaleUp: false,

      //Basic Speeds
      slideSpeed: 200,
      paginationSpeed: 800,
      rewindSpeed: 1000,

      //Autoplay
      autoPlay: false,
      stopOnHover: false,

      // Navigation
      navigation: false,
      navigationText: ['prev', 'next'],
      rewindNav: true,
      scrollPerPage: false,

      //Pagination
      pagination: true,
      paginationNumbers: false,

      // Responsive
      responsive: true,
      responsiveRefreshRate: 200,
      responsiveBaseWidth: window,

      // CSS Styles
      baseClass: '../lib/OwlCarousel-master/owl-carousel',
      theme: '../lib/OwlCarousel-master/owl-carousel/owl-theme',

      //Lazy load
      lazyLoad: false,
      lazyFollow: true,
      lazyEffect: 'fade',

      //Auto height
      autoHeight: false,

      //JSON
      jsonPath: false,
      jsonSuccess: false,

      //Mouse Events
      dragBeforeAnimFinish: true,
      mouseDrag: true,
      touchDrag: true,

      //Transitions
      transitionStyle: false,

      // Other
      addClassActive: false,

      //Callbacks
      beforeUpdate: false,
      afterUpdate: false,
      beforeInit: false,
      afterInit: false,
      beforeMove: false,
      afterMove: false,
      afterAction: false,
      startDragging: false
    }
  };

});
