'use strict';

angular.module('eMarketApp').factory('Patterns', function() {
  return {
    user: {
      fullName: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ][\s]?){2,160}$/,
      firstName: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/,
      middleName: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/,
      lastName: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/,
      username: /^[a-zA-Z0-9_]{3,16}$/,
      password: /^[a-zA-Z0-9_ñÑáéíóúÁÉÍÓÚ]{4,40}$/
    },
    address: {
      street: /^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ][,.\s\-'#&\(\)]*){5,255}$/,
      country: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ][\s]?){2,45}$/,
      city: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/,
      geoRegion: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/,
      zipCode: /^\d{5}(?:[-]\d{4})?$/,
      telephone: /^\d{10}$/
    },
    card: {
      expDate: /^20\d\d-(0[1-9]|1[012])$/,
      number: /^[0-9]{13,16}$/,
      csv: /^[0-9]{3,4}$/
    },
    bank: {
      name: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ][\s]?){2,160}$/,
      accNum: /^[0-9]{4,17}$/,
      routing: /^[0-9]{9}$/
    },
    question: {
      answer: /^([a-zA-Z0-9_ñÑáéíóúÁÉÍÓÚ][,.\s\-'#&\(\)]*){2,45}$/
    },
    item: {
      title: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ][\s]?){2,160}$/,
      brand: /^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ][\s\-]?){2,45}$/,
      model: /^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ][\s\-]?){2,45}$/,
      dimension: /^([0-9]{1,7}[a-zA-Z]{0,7}){1,3}$/,
      description: /^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ][,.\s\-'#&\(\)]*){5,255}$/,
      bidPrice: /^[1-9]{1}([0-9]{1,12})?(\.[0-9]{1,2})?$/,
      nonBidPrice: /^[1-9]{1}([0-9]{1,12})?(\.[0-9]{1,2})?$/,
      quantity: /^[1-9]{1}([0-9]{1,2})?$/,
      endDate: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/,
      shipping: /^0$|^([1-9]{1}([0-9]{1,12})?(\.[0-9]{1,2})?)$/,
      placeBid: /^[1-9]{1}([0-9]{1,12})?(\.[0-9]{1,2})?$/,
      buyItNow: /^[1-9]{1}([0-9]{1,12})?(\.[0-9]{1,2})?$/
    }
  };
});
