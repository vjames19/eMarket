'use strict';

angular.module('eMarketApp').directive('invoices', function(User, Helper) {
  return {
    templateUrl: 'views/invoices.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem) {

      var page = $(elem[0]);

      var invoiceList = page.find('#invoices-invoiceList');

      page.on('pagebeforeshow', function() {

        User.me().getList('invoices').then(function(invoices) {
          scope.invoices = invoices;
          Helper.refreshList(invoiceList);
        });

      });

    }
  };
});
