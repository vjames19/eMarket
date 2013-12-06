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

      var statusPopup = page.find('#invoices-statusPopup');
      var statusPopupMessage = page.find('#invoices-statusPopupMessage');

      page.on('pagebeforeshow', function() {

        User.me().getList('invoices').then(function(invoices) {
          scope.invoices = invoices;
          Helper.refreshList(invoiceList);
        });

      });

      page.on('pageshow', function() {

        statusPopup.off();
        if(scope.invoices.length === 0) {
          statusPopupMessage.text('No invoices found.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#home-user');
            }
          });
        }

      });

    }
  };
});
