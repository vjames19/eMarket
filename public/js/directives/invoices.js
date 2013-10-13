'use strict';

angular.module('eMarketApp').directive('invoices', function(User, Restangular) {
  return {
    templateUrl: 'views/invoices.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);
      var invoiceList = page.find('#invoiceList');

      page.on('pagebeforeshow', function() {
        User.me().getList('invoices').then(function(invoices) {
          scope.invoices = invoices;
          setTimeout(function() {
            invoiceList.listview('refresh');
          });
        });
      });

    }
  };
});
