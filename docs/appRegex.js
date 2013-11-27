'use strict';

// FOR SAMPLE PURPOSES ONLY, ADDING REGEX FOR DOCUMENTATION!!!

var regex = {
  user: {
    fullName: '/^([a-zA-ZñÑáéíóúÁÉÍÓÚ][\\s]?){2,160}$/',
    firstName: '/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/',
    middleName: '/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/',
    lastName: '/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/',
    username: '/^[a-zA-Z0-9_]{3,16}$/',
    password: '/^[a-zA-Z0-9_ñÑáéíóúÁÉÍÓÚ]{4,40}$/'
  },
  address: {
    street: '/^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ][,.\\s\\-\'#&\\(\\)]*){5,255}$/',
    country: '/^([a-zA-ZñÑáéíóúÁÉÍÓÚ][\\s]?){2,45}$/',
    city: '/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/',
    geoRegion: '/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,45}$/',
    zipCode: '/^\\d{5}(?:[-]\\d{4})?$/',
    telephone: '/^\\d{10}$/'
  },
  card: {
    expDate: '/^20\\d\\d-(0[1-9]|1[012])$/',
    number: '/^[0-9]{13,16}$/',
    csv: '/^[0-9]{3,4}$/'
  },
  bank: {
    name: '/^([a-zA-ZñÑáéíóúÁÉÍÓÚ][\\s]?){2,160}$/',
    accNum: '/^[0-9]{4,17}$/',
    routing: '/^[0-9]{9}$/'
  },
  questions: {
    answer: '/^([a-zA-Z0-9_ñÑáéíóúÁÉÍÓÚ][,.\\s\\-\'#&\\(\\)]*){2,45}$/'
  },
  item: {
    title: '',
    brand: '',
    model: '',
    dimension: '',
    description: '',
    bidPrice: '',
    nonBidPrice: '',
    quantity: '',
    endDate: '',
    shipping: '',
    placeBid: ''
  }
};
