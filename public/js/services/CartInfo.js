'use strict';

angular.module('eMarketApp').factory('CartInfo', function() {
  var cartInfo = {
    itemsAmount: 0,
    cost: 0.0,
    shipping: 0.0
  };
  return {
    setCartInfo: function(items, cost, shipping) {
      cartInfo.itemsAmount = items;
      cartInfo.cost = cost;
      cartInfo.shipping = shipping;
    },
    getCartInfo: function() {
      return cartInfo;
    }
  };
});
