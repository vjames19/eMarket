'use strict';

angular.module('eMarketApp').directive('homeAdmin', function() {
  return {
    templateUrl: 'views/homeAdmin.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Auth) {

      $scope.logOut = Auth.logOut;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var header = page.find('[data-role=header]');
      var content = page.find('[data-role=content]');
      var footer = page.find('[data-role=footer]');

      page.on('pageshow', function() {

        content.css('margin-top', ($(window).height() - header.height() - footer.height() - content.outerHeight()) / 2);

      });

    }
  };
});
