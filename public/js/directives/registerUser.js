/**
 * Created with JetBrains WebStorm.
 * User: Eduardo
 * Date: 10/2/13
 * Time: 9:40 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

angular.module('eMarketApp')
    .directive('registerUser', function () {
      return {
        templateUrl: 'views/registerUser.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
