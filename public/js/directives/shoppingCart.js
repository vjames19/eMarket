/**
 * Created with JetBrains WebStorm.
 * User: Eduardo
 * Date: 9/30/13
 * Time: 12:07 AM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

angular.module('eMarketApp')
    .directive('shoppingCart', function () {
      return {
        templateUrl: 'views/shoppingCart.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
