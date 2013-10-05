'use strict';

var _ = require('underscore');

var users = {
  1: {
    userId: 1,
    username: 'chencho_mata',
    userFirstName: 'Chencho',
    userMiddleName: 'Mata',
    userLastName: 'Vaca',
    userEmail: 'chencho.vaca@upr.edu',
    userTelephone: '787-459-6285'
  },
  2: {
    userId: 2,
    username: 'mariano_sol',
    userFirstName: 'Mariano',
    userMiddleName: null,
    userLastName: 'Sol',
    userEmail: 'mariano.sol@upr.edu',
    userTelephone: '787-415-4952'
  }
};


exports.findUserById = function (req, res, next, id) {
  if (!users[+id]) {
    res.jsonp(404, {message: 'User not found'});
  } else {
    req.user = users[+id];
    next();
  }
};

/**
 * List of users
 */
exports.readAllUsers = function (req, res) {
  res.jsonp(_.values(users));
};

/**
 * Create a user
 */
exports.createUser = function (req, res) {
  var user = req.body;
  user.userId = _.keys(users).length + 1;
  users[user.userId] = user;
  res.jsonp(user);
};

/**
 * Read a user
 */
exports.readUser = function (req, res) {
  res.jsonp(req.user);
};

/**
 * Update a user
 */
exports.updateUser = function (req, res) {
  _.extend(req.user, req.body);
  users[req.user.userId] = req.user;
  res.jsonp(req.user);
};

/**
 * Delete a user
 */
exports.deleteUser = function (req, res) {
  delete users[req.user.userId];
  res.jsonp(req.user);
};

// Drafts
var drafts = {
  1: {
    draftId: 1,
    userFirstName: 'Chencho',
    userMiddleName: 'Mata',
    userLastName: 'Vaca',
    userTelephone: '787-459-6285',
    productSellerId: 1,
    productCategory: 'books',
    productName: 'harry potter',
    productBuyItNowPrice: null,
    productStartingBidPrice: null,
    productBidEndDate: '07/07/2007',
    productShippingPrice: null,
    productQuantity: 5,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/1/z98how.png',
      productBrand: 'pearson',
      productModel: 'IBN:19238476',
      productDimensions: '30x29x49'
    }
  },
  2: {
    draftId: 2,
    userFirstName: 'Chencho',
    userMiddleName: 'Mata',
    userLastName: 'Vaca',
    userTelephone: '787-459-6285',
    productSellerId: 9,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: null,
    productStartingBidPrice: null,
    productBidEndDate: '07/07/2008',
    productShippingPrice: null,
    productQuantity: 3,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    }
  }
};

exports.findDraftById = function (req, res, next, id) {
  if (!drafts[+id]) {
    res.jsonp(404, {message: 'Draft not found'});
  } else {
    req.draft = drafts[+id];
    next();
  }
};

exports.readAllDrafts = function (req, res) {
  res.jsonp(_.values(drafts));
};

exports.createDraft = function (req, res) {
  var draft = req.body;
  draft.draftId = _.keys(drafts).length + 1;
  drafts[draft.draftId] = draft;
  res.jsonp(draft);
};

exports.readDraft = function (req, res) {
  res.jsonp(req.draft);
};

exports.updateDraft = function (req, res) {
  _.extend(req.draft, req.body);
  drafts[req.draft.draftId] = req.draft;
  res.jsonp(req.draft);
};

exports.deleteDraft = function (req, res) {
  delete drafts[req.draft.draftId];
  res.jsonp(req.draft);
};

// Invoices
var invoices = {
  1: {
    invoiceId: 1,
    invoiceNumber: 454505,
    products: {
      1: {
        productId: 1,
        productName: 'alienware',
        quantity: 2
      },
      2: {
        productId: 2,
        productName: 'dell',
        quantity: 4
      }
    },
    orderPrice: 6560.00,
    date: '10-10-2013',
    paymentTypeId: 54504155454,
    paymentType: 'Card'
  },
  2: {
    invoiceId: 2,
    invoiceNumber: 989262,
    products: {
      1: {
        productId: 1,
        productName: 'pig',
        quantity: 8
      },
      2: {
        productId: 2,
        productName: 'dog',
        quantity: 3
      }
    },
    orderPrice: 877.99,
    date: '11-29-2013',
    paymentTypeId: 454151554,
    paymentType: 'Bank'
  }
};

exports.findInvoiceById = function (req, res, next, id) {
  if (!invoices[+id]) {
    res.jsonp(404, {message: 'Invoice not found'});
  } else {
    req.invoice = invoices[+id];
    next();
  }
};

exports.readAllInvoices = function (req, res) {
  res.jsonp(_.values(invoices));
};

exports.createInvoice = function (req, res) {
  var invoice = req.body;
  invoice.invoiceId = _.keys(invoices).length + 1;
  invoices[invoice.invoiceId] = invoice;
  res.jsonp(invoice);
};

exports.readInvoice = function (req, res) {
  res.jsonp(req.invoice);
};

exports.updateInvoice = function (req, res) {
  _.extend(req.invoice, req.body);
  invoices[req.invoice.invoiceId] = req.invoice;
  res.jsonp(req.invoice);
};

exports.deleteInvoice = function (req, res) {
  delete invoices[req.invoice.invoiceId];
  res.jsonp(req.invoice);
};

// Mail Addresses
var mailAddresses = {
  1: {
    mailAddressId: 1,
    userId: 1,
    mailAddress: 'Urb. Mata La Vaca, Cuchillo Street',
    city: 'Camuy',
    country: 'Puerto Rico',
    geographicalRegion: null,
    zipCode: '00746',
    recipientName: 'Tesla Quiles',
    telephone: '787-458-6156',
    isPrimary: true
  },
  2: {
    mailAddressId: 2,
    userId: 1,
    mailAddress: 'Urb. Pollo Mojao, Pechuga Street',
    city: 'Mayaguez',
    country: 'Puerto Rico',
    geographicalRegion: null,
    zipCode: '05946',
    recipientName: 'Juan del Pueblo',
    telephone: '787-458-1226',
    isPrimary: false

  },
  3: {
    mailAddressId: 3,
    userId: 2,
    mailAddress: 'Barrio Palmas, Calle Perla',
    city: 'New York',
    country: 'United States',
    geographicalRegion: null,
    zipCode: '00956',
    recipientName: 'John the People',
    telephone: '412-458-3246',
    isPrimary: false
  }
};

exports.findMailAddressById = function (req, res, next, id) {
  if (!mailAddresses[+id]) {
    res.jsonp(404, {message: 'Mailing Address Not Found'});
  } else {
    req.mailAddress = mailAddresses[+id];
    next();
  }
};

exports.readAllMailAddresses = function (req, res) {
  res.jsonp(_.values(mailAddresses));
};

exports.createMailAddress = function (req, res) {
  var mailAddress = req.body;
  mailAddress.mailAddressId = _.keys(mailAddresses).length + 1;
  mailAddresses[mailAddress.mailAddressId] = mailAddress;
  res.jsonp(mailAddress);
};

exports.readMailAddress = function (req, res) {
  res.jsonp(req.mailAddress);
};

exports.updateMailAddress = function (req, res) {
  _.extend(req.mailAddress, req.body);
  mailAddresses[req.mailAddress.mailAddressId] = req.mailAddress;
  res.jsonp(req.mailAddress);
};

exports.deleteMailAddress = function (req, res) {
  delete mailAddresses[req.mailAddress.mailAddressId];
  res.jsonp(req.mailAddress);
};


// Bill Addresses
var billAddresses = {
  1: {
    billAddressId: 1,
    userId: 1,
    billAddress: 'Urb. Mata La Vaca, Cuchillo Street',
    city: 'Camuy',
    country: 'Puerto Rico',
    geographicalRegion: null,
    zipCode: '00746',
    recipientName: 'Tesla Quiles',
    telephone: '787-458-6156',
    paymentTypeId: 54504155454,
    paymentType: 'Card'
  },
  2: {
    billAddressId: 2,
    userId: 1,
    billAddress: 'Urb. Pollo Mojao, Pechuga Street',
    city: 'Mayaguez',
    country: 'Puerto Rico',
    geographicalRegion: null,
    zipCode: '05946',
    recipientName: 'Juan del Pueblo',
    telephone: '787-458-1226',
    paymentTypeId: 44564155454,
    paymentType: 'Bank'
  },
  3: {
    billAddressId: 3,
    userId: 2,
    billAddress: 'Barrio Palmas, Calle Perla',
    city: 'New York',
    country: 'United States',
    geographicalRegion: null,
    zipCode: '00956',
    recipientName: 'John the People',
    telephone: '412-458-3246',
    paymentTypeId: 54504155454,
    paymentType: 'Card'
  }
};

exports.findBillAddressById = function (req, res, next, id) {
  if (!billAddresses[+id]) {
    res.jsonp(404, {message: 'Billing Address Not Found'});
  } else {
    req.billAddress = billAddresses[+id];
    next();
  }
};

exports.readAllBillAddresses = function (req, res) {
  res.jsonp(_.values(billAddresses));
};

exports.createBillAddress = function (req, res) {
  var billAddress = req.body;
  billAddress.billAddressId = _.keys(billAddresses).length + 1;
  billAddresses[billAddress.billAddressId] = billAddress;
  res.jsonp(billAddress);
};

exports.readBillAddress = function (req, res) {
  res.jsonp(req.billAddress);
};

exports.updateBillAddress = function (req, res) {
  _.extend(req.billAddress, req.body);
  billAddresses[req.billAddress.billAddressId] = req.billAddress;
  res.jsonp(req.billAddress);
};

exports.deleteBillAddress = function (req, res) {
  delete billAddresses[req.billAddress.billAddressId];
  res.jsonp(req.billAddress);
};

// Notifications
var notifications = {
  1: {
    notificationId: 1,
    userId: 1,
    message: 'You have won an ultrabook!',
    notificationDate: '10-10-2013',
    isRead: true
  },
  2: {
    notificationId: 2,
    userId: 1,
    message: 'You have won a car!',
    notificationDate: '10-10-2013',
    isRead: false
  },
  3: {
    notificationId: 3,
    userId: 2,
    message: 'You have won a pig!',
    notificationDate: '10-10-2013',
    isRead: false
  }
};

exports.findNotificationById = function (req, res, next, id) {
  if (!notifications[+id]) {
    res.jsonp(404, {message: 'Notification Not Found'});
  } else {
    req.notification = notifications[+id];
    next();
  }
};

exports.readAllNotifications = function (req, res) {
  res.jsonp(_.values(notifications));
};

exports.createNotification = function (req, res) {
  var notification = req.body;
  notification.notificationId = _.keys(notifications).length + 1;
  notifications[notification.notificationId] = notification;
  res.jsonp(notification);
};

exports.readNotification = function (req, res) {
  res.jsonp(req.notification);
};

exports.updateNotification = function (req, res) {
  _.extend(req.notification, req.body);
  notifications[req.notification.notificationId] = req.notification;
  res.jsonp(req.notification);
};

exports.deleteNotification = function (req, res) {
  delete notifications[req.notification.notificationId];
  res.jsonp(req.notification);
};

// Credit Cards
var creditCards = {
  1: {
    creditCardId: 1,
    creditCardName: 'Apu',
    creditCardType: 'Visa',
    creditCardExpDate: '07/07/2018',
    creditCardNumber: 1234567887654321,
    creditCardCvs: 123,
    creditCardBillingAddressId: 1
  },
  2: {
    creditCardId: 2,
    creditCardName: 'Amy',
    creditCardType: 'MasterCard',
    creditCardExpDate: '09/09/2028',
    creditCardNumber: 8765567843211234,
    creditCardCvs: 7890,
    creditCardBillingAddressId: 2
  },
  3: {
    creditCardId: 3,
    creditCardName: 'Gil',
    creditCardType: 'AmericanExpress',
    creditCardExpDate: '11/11/2038',
    creditCardNumber: 8172635445362718,
    creditCardCvs: 4567,
    creditCardBillingAddressId: 3
  }
};

exports.findCreditCardById = function (req, res, next, id) {
  if (!creditCards[+id]) {
    res.jsonp(404, {message: 'Credit Card Not Found'});
  } else {
    req.creditCard = creditCards[+id];
    next();
  }
};

exports.readAllCreditCards = function (req, res) {
  res.jsonp(_.values(creditCards));
};

exports.createCreditCard = function (req, res) {
  var creditCard = req.body;
  creditCard.creditCardId = _.keys(creditCards).length + 1;
  creditCards[creditCard.creditCardId] = creditCard;
  res.jsonp(creditCard);
};

exports.readCreditCard = function (req, res) {
  res.jsonp(req.creditCard);
};

exports.updateCreditCard = function (req, res) {
  _.extend(req.creditCard, req.body);
  creditCards[req.creditCard.creditCardId] = req.creditCard;
  res.jsonp(req.creditCard);
};

exports.deleteCreditCard = function (req, res) {
  delete creditCards[req.creditCard.creditCardId];
  res.jsonp(req.creditCard);
};

// Bank Accounts
var bankAccounts = {
  1: {
    bankId: 1,
    bankName: 'SamBanks',
    bankAccountName: 'Apu',
    bankAccountType: 'Checking',
    bankAccountNumber: 123456789,
    bankAccountRouting: 123456789,
    bankBillingAddressId: 1
  },
  2: {
    bankId: 2,
    bankName: 'EduBanks',
    bankAccountName: 'Amy',
    bankAccountType: 'Savings',
    bankAccountNumber: 12345678909876543,
    bankAccountRouting: 987654321,
    bankBillingAddressId: 2
  },
  3: {
    bankId: 3,
    bankName: 'VicBanks',
    bankAccountName: 'Gil',
    bankAccountType: 'Growth',
    bankAccountNumber: 1029384756758,
    bankAccountRouting: 192834756,
    bankBillingAddressId: 3
  }
};

exports.findBankAccountById = function (req, res, next, id) {
  if (!bankAccounts[+id]) {
    res.jsonp(404, {message: 'Bank Account Not Found'});
  } else {
    req.bankAccount = bankAccounts[+id];
    next();
  }
};

exports.readAllBankAccounts = function (req, res) {
  res.jsonp(_.values(bankAccounts));
};

exports.createBankAccount = function (req, res) {
  var bankAccount = req.body;
  bankAccount.bankId = _.keys(bankAccounts).length + 1;
  bankAccounts[bankAccount.bankId] = bankAccount;
  res.jsonp(bankAccount);
};

exports.readBankAccount = function (req, res) {
  res.jsonp(req.bankAccount);
};

exports.updateBankAccount = function (req, res) {
  _.extend(req.bankAccount, req.body);
  bankAccounts[req.bankAccount.bankId] = req.bankAccount;
  res.jsonp(req.bankAccount);
};

exports.deleteBankAccount = function (req, res) {
  delete bankAccounts[req.bankAccount.bankId];
  res.jsonp(req.bankAccount);
};

// Sold Products
var soldProducts = {
  1: {
    productId: 1,
    productSellerId: 1,
    productCategory: 'books',
    productName: 'harry potter',
    productBuyItNowPrice: 100,
    productStartingBidPrice: 80,
    productBidEndDate: '07/07/2007',
    productShippingPrice: 18.99,
    productQuantitySold: 5,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/1/z98how.png',
      productBrand: 'pearson',
      productModel: 'IBN:19238476',
      productDimensions: '30x29x49'
    },
    productSoldDate: '07/06/2007'
  },
  2: {
    productId: 2,
    productSellerId: 9,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 1000.99,
    productStartingBidPrice: 500.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantitySold: 3,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    productSoldDate: '07/06/2008'
  },
  3: {
    productId: 3,
    productSellerId: 403,
    productCategory: 'shirts',
    productName: 'American Eaglo Shirt',
    productBuyItNowPrice: 49.99,
    productStartingBidPrice: 20.99,
    productBidEndDate: '07/07/2009',
    productShippingPrice: 5.99,
    productQuantitySold: 9,
    productDescription: {
      productCondition: 'User',
      productPicture: '/img/products/users/403/z89kik.png',
      productBrand: 'AmericanEagle',
      productModel: 'K99',
      productDimensions: '10x20x30'
    },
    productSoldDate: '07/06/2009'
  }
};

exports.findSoldProductById = function (req, res, next, id) {
  if (!soldProducts[+id]) {
    res.jsonp(404, {message: 'Sold Product Not Found'});
  } else {
    req.soldProduct = soldProducts[+id];
    next();
  }
};

exports.readAllSoldProducts = function (req, res) {
  res.jsonp(_.values(soldProducts));
};

exports.createSoldProduct = function (req, res) {
  var soldProduct = req.body;
  soldProduct.productId = _.keys(soldProducts).length + 1;
  soldProducts[soldProduct.productId] = soldProduct;
  res.jsonp(soldProduct);
};

exports.readSoldProduct = function (req, res) {
  res.jsonp(req.soldProduct);
};

exports.updateSoldProduct = function (req, res) {
  _.extend(req.soldProduct, req.body);
  soldProducts[req.soldProduct.productId] = req.soldProduct;
  res.jsonp(req.soldProduct);
};

exports.deleteSoldProduct = function (req, res) {
  delete soldProducts[req.soldProduct.productId];
  res.jsonp(req.soldProduct);
};

// Unsold Products
var unsoldProducts = {
  1: {
    productId: 1,
    productSellerId: 1,
    productCategory: 'books',
    productName: 'harry potter',
    productBuyItNowPrice: 100,
    productStartingBidPrice: 80,
    productBidEndDate: '07/07/2007',
    productShippingPrice: 18.99,
    productQuantityRemaining: 5,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/1/z98how.png',
      productBrand: 'pearson',
      productModel: 'IBN:19238476',
      productDimensions: '30x29x49'
    }
  },
  2: {
    productId: 2,
    productSellerId: 9,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 1000.99,
    productStartingBidPrice: 500.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantityRemaining: 3,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    }
  },
  3: {
    productId: 3,
    productSellerId: 403,
    productCategory: 'shirts',
    productName: 'American Eaglo Shirt',
    productBuyItNowPrice: 49.99,
    productStartingBidPrice: 20.99,
    productBidEndDate: '07/07/2009',
    productShippingPrice: 5.99,
    productQuantityRemaining: 9,
    productDescription: {
      productCondition: 'User',
      productPicture: '/img/products/users/403/z89kik.png',
      productBrand: 'AmericanEagle',
      productModel: 'K99',
      productDimensions: '10x20x30'
    }
  }
};

exports.findUnsoldProductById = function (req, res, next, id) {
  if (!unsoldProducts[+id]) {
    res.jsonp(404, {message: 'Unsold Product Not Found'});
  } else {
    req.unsoldProduct = unsoldProducts[+id];
    next();
  }
};

exports.readAllUnsoldProducts = function (req, res) {
  res.jsonp(_.values(unsoldProducts));
};

exports.createUnsoldProduct = function (req, res) {
  var unsoldProduct = req.body;
  unsoldProduct.unsoldProductId = _.keys(unsoldProducts).length + 1;
  unsoldProducts[unsoldProduct.productId] = unsoldProduct;
  res.jsonp(unsoldProduct);
};

exports.readUnsoldProduct = function (req, res) {
  res.jsonp(req.unsoldProduct);
};

exports.updateUnsoldProduct = function (req, res) {
  _.extend(req.unsoldProduct, req.body);
  unsoldProducts[req.unsoldProduct.productId] = req.unsoldProduct;
  res.jsonp(req.unsoldProduct);
};

exports.deleteUnsoldProduct = function (req, res) {
  delete unsoldProducts[req.unsoldProduct.productId];
  res.jsonp(req.unsoldProduct);
};

// Carts
var carts = {
  1: {
    cartId: 1,
    userId: 1,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 599.99,
    productStartingBidPrice: 500.99,
    productCurrentBidPrice: 800.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    quantity: 2,
    cost: 1199.99
  },
  2: {
    cartId: 2,
    userId: 1,
    productCategory: 'computers',
    productName: 'dell',
    productBuyItNowPrice: 16.99,
    productStartingBidPrice: 5.99,
    productCurrentBidPrice: 8.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantitySold: 3,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    quantity: 4,
    cost: 99.99
  }
};

exports.findCartById = function (req, res, next, id) {
  if (!carts[+id]) {
    res.jsonp(404, {message: 'Shopping Cart Not Found'});
  } else {
    req.cart = carts[+id];
    next();
  }
};

exports.readAllCarts = function (req, res) {
  res.jsonp(_.values(carts));
};

exports.createCart = function (req, res) {
  var cart = req.body;
  cart.cartId = _.keys(carts).length + 1;
  carts[cart.cartId] = cart;
  res.jsonp(cart);
};

exports.readCart = function (req, res) {
  res.jsonp(req.cart);
};

exports.updateCart = function (req, res) {
  _.extend(req.cart, req.body);
  carts[req.cart.cartId] = req.cart;
  res.jsonp(req.cart);
};

exports.deleteCart = function (req, res) {
  delete carts[req.cart.cartId];
  res.jsonp(req.cart);
};

// Bids
var bids = {
  1: {
    bidId: 1,
    userId: 1,
    productId: 1,
    bidAmount: 19.99,
    bidTime: '07/19/2013:19:20:35 EST'
  },
  2: {
    bidId: 2,
    userId: 2,
    productId: 2,
    bidAmount: 29.99,
    bidTime: '07/10/2013:14:13:42 EST'
  }
};

exports.findUserBidById = function (req, res, next, id) {
  if (!bids[+id]) {
    res.jsonp(404, {message: 'User Bid Not Found'});
  } else {
    req.bid = bids[+id];
    next();
  }
};

exports.readAllUserBids = function (req, res) {
  res.jsonp(_.values(bids));
};

exports.createUserBid = function (req, res) {
  var bid = req.body;
  bid.bidId = _.keys(bids).length + 1;
  bids[bid.bidId] = bid;
  res.jsonp(bid);
};

exports.readUserBid = function (req, res) {
  res.jsonp(req.bid);
};

exports.updateUserBid = function (req, res) {
  _.extend(req.bid, req.body);
  bids[req.bid.bidId] = req.bid;
  res.jsonp(req.bid);
};

exports.deleteUserBid = function (req, res) {
  delete bids[req.bid.bidId];
  res.jsonp(req.bid);
};

// Broswed Items
var browsedItems =
{
  1: {
    browsedItemId: 1,
    userId: 1,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 1000.99,
    productStartingBidPrice: 500.99,
    productCurrentBidPrice: 740.00,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantity: 3,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    dateBrowsed: '07/10/2013:14:13:42 EST'
  },
  2: {
    browsedItemId: 2,
    userId: 1,
    productCategory: 'books',
    productName: 'harry potter',
    productBuyItNowPrice: 100,
    productStartingBidPrice: 80,
    productCurrentBidPrice: 87,
    productBidEndDate: '07/07/2007',
    productShippingPrice: 18.99,
    productQuantity: 5,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/1/z98how.png',
      productBrand: 'pearson',
      productModel: 'IBN:19238476',
      productDimensions: '30x29x49'
    },
    dateBrowsed: '07/30/2013:01:01:01 EST'
  }
};

exports.findBrowsedItemById = function (req, res, next, id) {
  if (!browsedItems[+id]) {
    res.jsonp(404, {message: 'Browsed Item Not Found'});
  } else {
    req.browsedItem = browsedItems[+id];
    next();
  }
};

exports.readAllBrowsedItems = function (req, res) {
  res.jsonp(_.values(browsedItems));
};

exports.createBrowsedItem = function (req, res) {
  var browsedItem = req.body;
  browsedItem.browsedItemId = _.keys(browsedItems).length + 1;
  browsedItems[browsedItem.browsedItemId] = browsedItem;
  res.jsonp(browsedItem);
};

exports.readBrowsedItem = function (req, res) {
  res.jsonp(req.browsedItem);
};

exports.updateBrowsedItem = function (req, res) {
  _.extend(req.browsedItem, req.body);
  browsedItems[req.browsedItem.browsedItemId] = req.browsedItem;
  res.jsonp(req.browsedItem);
};

exports.deleteBrowsedItem = function (req, res) {
  delete browsedItems[req.browsedItem.browsedItemId];
  res.jsonp(req.browsedItem);
};


// Purchases
var purchases = {
  1: {
    purchaseId: 1,
    productCategory: 'computers',
    productName: 'alienware',
    productBuyItNowPrice: 599.99,
    productStartingBidPrice: 500.99,
    productCurrentBidPrice: 800.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantitySold: 3,
    productDescription: {
      productCondition: 'Refurbished',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    quantity: 2,
    soldPrice: 1199.99,
    date: '07/30/2013:01:01:01 EST'
  },
  2: {
    purchaseId: 2,
    productCategory: 'computers',
    productName: 'dell',
    productBuyItNowPrice: 16.99,
    productStartingBidPrice: 5.99,
    productCurrentBidPrice: 8.99,
    productBidEndDate: '07/07/2008',
    productShippingPrice: 8.99,
    productQuantitySold: 3,
    productDescription: {
      productCondition: 'New',
      productPicture: '/img/products/users/9/z98gyu.png',
      productBrand: 'dell',
      productModel: 'M179385',
      productDimensions: '19x30x25'
    },
    quantity: 4,
    soldPrice: 99.99,
    date: '07/30/2013:01:01:01 EST'
  }
};

exports.findPurchaseById = function (req, res, next, id) {
  if (!purchases[+id]) {
    res.jsonp(404, {message: 'Purchased Item Not Found'});
  } else {
    req.purchase = purchases[+id];
    next();
  }
};

exports.readAllPurchases = function (req, res) {
  res.jsonp(_.values(purchases));
};

exports.createPurchase = function (req, res) {
  var purchase = req.body;
  purchase.purchaseId = _.keys(purchases).length + 1;
  purchases[purchase.purchaseId] = purchase;
  res.jsonp(purchase);
};

exports.readPurchase = function (req, res) {
  res.jsonp(req.purchase);
};

exports.updatePurchase = function (req, res) {
  _.extend(req.purchase, req.body);
  purchases[req.purchase.purchaseId] = req.purchase;
  res.jsonp(req.purchase);
};

exports.deletePurchase = function (req, res) {
  delete purchases[req.purchase.purchaseId];
  res.jsonp(req.purchase);
};

// Rating
var ratings = {
  1: {
    ratingId: 1,
    raterId: 1,
    raterName: 'Paco',
    rating: '***'
  },
  2: {
    ratingId: 2,
    raterId: 9,
    raterName: 'Truqui',
    rating: '**'
  },
  3: {
    ratingId: 3,
    raterId: 15,
    raterName: 'Juan',
    rating: '****'
  }
};

exports.findRatingById = function (req, res, next, id) {
  if (!ratings[+id]) {
    res.jsonp(404, {message: 'Rating Item Not Found'});
  } else {
    req.rating = ratings[+id];
    next();
  }
};

exports.readAllRatings = function (req, res) {
  res.jsonp(_.values(ratings));
};

exports.readRating = function (req, res) {
  res.jsonp(req.rating);
};
