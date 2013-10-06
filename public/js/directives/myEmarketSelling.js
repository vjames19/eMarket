'use strict';

angular.module('eMarketApp')
  .directive('myEmarketSelling', function (User) {
    return {
      templateUrl: 'views/myEmarketSelling.html',
      restrict: 'E',
      scope: true,
      replace: true,
      link: function(scope, elem) {
        var page = $(elem[0]);
        var soldAndUnsoldList = page.find("#soldAndUnsoldList");

        page.on('pagebeforeshow', function() {
          scope.unsoldProducts = User.me().getList('unsoldProducts');
          scope.soldProducts = User.me().getList('soldProducts');
        });

        page.on('pageshow', function() {
          soldAndUnsoldList.listview('refresh');
        });
      }
    };
  });
