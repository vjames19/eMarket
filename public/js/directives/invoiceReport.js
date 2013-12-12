'use strict';

angular.module('eMarketApp').directive('invoiceReport', function(User, Helper, Invoice) {
  return {
    templateUrl: 'views/invoiceReport.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem) {

      var page = $(elem[0]);

      var invoiceProductsList = page.find('#invoiceReport-invoiceProductsList');

      page.on('pagebeforeshow', function() {

        User.me().one('invoices', Invoice.invoice.id).getList('products').then(function(invoiceProducts) {
          scope.invoiceProducts = invoiceProducts;
          Helper.refreshList(invoiceProductsList);
        });

      });

    }
  };
});

