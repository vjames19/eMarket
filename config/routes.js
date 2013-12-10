'use strict';

module.exports = function(app, passport, auth) {

  //=================USER ROUTES================//

  var users = require('../app/controllers/users');

  app.post('/login', passport.authenticate('user'), function(req, res, next) {
    if(!req.user) {
      next({code: 404, message: 'User not found.'});
    } else {
      res.jsonp(200, req.user);
    }
  });

  app.post('/admin/login', passport.authenticate('admin'), function(req, res, next) {
    if(!req.user) {
      next({code: 404, message: 'Admin not found.'});
    } else {
      res.jsonp(200, req.user);
    }
  });

  app.get('/logout', function(req, res, next) {
    if(!req.user) {
      next({code: 404, message: 'User not found.'});
    } else {
      req.logout();
      res.jsonp(200);
    }
  });

  // TODO: Secure users API

  // User Routes
  // The user needs to be logged in to be able to modify.
  app.post('/api/*', auth.requiresLogin);
  app.put('/api/*', auth.requiresLogin);
  app.del('/api/*', auth.requiresLogin);

  // Users can't access anothers user's resource.
  app.all('/api/users/:userId/*', auth.hasSameUserId);
  app.param('userId', users.findUserById);
  app.get('/api/users', users.readAllUsers);
  app.post('/register', users.createUser); // Doest not require login.
  app.post('/forgot', users.changeUserPassword); // Doest not require login.
  app.get('/api/users/:userId', users.readUser);
  app.put('/api/users/:userId', users.updateUser);
  app.del('/api/users/:userId', users.deleteUser);

  // User Draft Routes
  app.param('draftId', users.findDraftById);
  app.get('/api/users/:userId/drafts', users.readAllDrafts);
  app.post('/api/users/:userId/drafts', users.createDraft);
  app.get('/api/users/:userId/drafts/:draftId', users.readDraft);
  app.put('/api/users/:userId/drafts/:draftId', users.updateDraft);
  app.del('/api/users/:userId/drafts/:draftId', users.deleteDraft);

  // User Invoice Routes
  app.param('invoiceId', users.findInvoiceById);
  app.get('/api/users/:userId/invoices', users.readAllInvoices);
  app.post('/api/users/:userId/invoices', users.createInvoice);
  app.get('/api/users/:userId/invoices/:invoiceId', users.readInvoice);
  app.put('/api/users/:userId/invoices/:invoiceId', users.updateInvoice);
  app.del('/api/users/:userId/invoices/:invoiceId', users.deleteInvoice);

  // Get products of invoices
  app.get('/api/users/:userId/invoices/:invoiceId/products', users.readAllProductsInvoice);

  // User Mailing Addresses Routes
  app.param('mailAddressId', users.findMailAddressById);
  app.get('/api/users/:userId/mailAddresses', users.readAllMailAddresses);
  app.post('/api/users/:userId/mailAddresses', users.createMailAddress);
  app.get('/api/users/:userId/mailAddresses/:mailAddressId', users.readMailAddress);
  app.put('/api/users/:userId/mailAddresses/:mailAddressId', users.updateMailAddress);
  app.del('/api/users/:userId/mailAddresses/:mailAddressId', users.deleteMailAddress);

  // User Billing Addresses Routes
  app.param('billAddressId', users.findBillAddressById);
  app.get('/api/users/:userId/billAddresses', users.readAllBillAddresses);
  app.post('/api/users/:userId/billAddresses', users.createBillAddress);
  app.get('/api/users/:userId/billAddresses/:billAddressId', users.readBillAddress);
  app.put('/api/users/:userId/billAddresses/:billAddressId', users.updateBillAddress);
  app.del('/api/users/:userId/billAddresses/:billAddressId', users.deleteBillAddress);

  // User Notifications Routes
  app.param('notificationId', users.findNotificationById);
  app.get('/api/users/:userId/notifications', users.readAllNotifications);
  app.post('/api/users/:userId/notifications', users.validateNotification, users.createNotification);
  app.get('/api/users/:userId/notifications/:notificationId', users.readNotification);
  app.put('/api/users/:userId/notifications/:notificationId', users.validateNotification, users.updateNotification);

  // User Credit Card Routes
  app.param('creditCardId', users.findCreditCardById);
  app.get('/api/users/:userId/creditCards', users.readAllCreditCards);
  app.post('/api/users/:userId/creditCards', users.createCreditCard);
  app.get('/api/users/:userId/creditCards/:creditCardId', users.readCreditCard);
  app.put('/api/users/:userId/creditCards/:creditCardId', users.updateCreditCard);
  app.del('/api/users/:userId/creditCards/:creditCardId', users.deleteCreditCard);

  // User Bank Account Routes
  app.param('bankId', users.findBankAccountById);
  app.get('/api/users/:userId/banks', users.readAllBankAccounts);
  app.post('/api/users/:userId/banks', users.createBankAccount);
  app.get('/api/users/:userId/banks/:bankId', users.readBankAccount);
  app.put('/api/users/:userId/banks/:bankId', users.updateBankAccount);
  app.del('/api/users/:userId/banks/:bankId', users.deleteBankAccount);

  // User Sold Products Routes
  app.param('soldProductId', users.findSoldProductById);
  app.get('/api/users/:userId/soldProducts', users.readAllSoldProducts);
  app.post('/api/users/:userId/soldProducts', users.createSoldProduct);
  app.get('/api/users/:userId/soldProducts/:soldProductId', users.readSoldProduct);
  app.put('/api/users/:userId/soldProducts/:soldProductId', users.updateSoldProduct);
  app.del('/api/users/:userId/soldProducts/:soldProductId', users.deleteSoldProduct);

  // User Unsold Products Routes
  app.param('unsoldProductId', users.findUnsoldProductById);
  app.get('/api/users/:userId/unsoldProducts', users.readAllUnsoldProducts);
  app.post('/api/users/:userId/unsoldProducts', users.createUnsoldProduct);
  app.get('/api/users/:userId/unsoldProducts/:unsoldProductId', users.readUnsoldProduct);
  app.put('/api/users/:userId/unsoldProducts/:unsoldProductId', users.updateUnsoldProduct);
  app.del('/api/users/:userId/unsoldProducts/:unsoldProductId', users.deleteUnsoldProduct);

  // User Cart Routes
  app.param('cartItemId', users.findCartById);
  app.get('/api/users/:userId/cartItems', users.readAll);
  app.post('/api/users/:userId/cartItems', users.createCart);
  app.get('/api/users/:userId/cartItems/:cartItemId', users.readCart);
  app.put('/api/users/:userId/cartItems/:cartItemId', users.updateCart);
  app.del('/api/users/:userId/cartItems/:cartItemId', users.deleteCart);

  // User Bid Routes
  app.param('userBidId', users.findUserBidById);
  app.get('/api/users/:userId/bids', users.readAllUserBids);
  app.post('/api/users/:userId/bids', users.createUserBid);
  app.get('/api/users/:userId/bids/:userBidId', users.readUserBid);
  app.put('/api/users/:userId/bids/:userBidId', users.updateUserBid);
  app.del('/api/users/:userId/bids/:userBidId', users.deleteUserBid);

  // User Browsed Item Routes
  app.param('browsedItemId', users.findBrowsedItemById);
  app.get('/api/users/:userId/browsedItems', users.readAllBrowsedItems);
  app.post('/api/users/:userId/browsedItems', users.createBrowsedItem);
  app.get('/api/users/:userId/browsedItems/:browsedItemId', users.readBrowsedItem);
  // Not supported
  //  app.put('/api/users/:userId/browsedItems/:browsedItemId', users.updateBrowsedItem);
  //  app.del('/api/users/:userId/browsedItems/:browsedItemId', users.deleteBrowsedItem);

  // User Purchases Routes
  app.param('purchaseId', users.findPurchaseById);
  app.get('/api/users/:userId/purchases', users.readAllPurchases);
  app.post('/api/users/:userId/purchases', users.createPurchase);
  app.get('/api/users/:userId/purchases/:purchaseId', users.readPurchase);
  app.put('/api/users/:userId/purchases/:purchaseId', users.updatePurchase);
  app.del('/api/users/:userId/purchases/:purchaseId', users.deletePurchase);

  // User Rating Routes
  app.param('ratingId', users.findRatingById);
  app.get('/api/users/:userId/ratings', users.readAllRatings);
  app.get('/api/users/:userId/ratings/:ratingId', users.readRating);
  app.get('/api/users/:userId/avgRating', users.readAvgRating);
  app.post('/api/users/:userId/ratings', users.createRating);

  // Security Questions Routes
  app.param('questionId', users.findQuestionById);
  app.get('/api/questions', users.readAllQuestions);
  app.post('/api/questions', users.createQuestion);
  app.get('/api/questions/:questionId', users.readQuestion);
  app.put('/api/questions/:questionId', users.updateQuestion);
  app.del('/api/questions/:questionId', users.deleteQuestion);

  // User Question Answer Routes
  app.param('questionAnswerId', users.findQuestionAnswerById);
  app.get('/api/users/:userId/questionsAnswers', users.readAllQuestionsAnswers);
  app.post('/api/users/:userId/questionsAnswers', users.createQuestionAnswer);
  app.get('/api/users/:userId/questionsAnswers/:questionAnswerId', users.readQuestionAnswer);
  app.put('/api/users/:userId/questionsAnswers/:questionAnswerId', users.updateQuestionAnswer);
  app.del('/api/users/:userId/questionsAnswers/:questionAnswerId', users.deleteQuestionAnswer);

  //=================NON USER ROUTES================//

  // Search Routes
  var search = require('../app/controllers/search.js');
  app.get('/api/search', search.searchProduct);

  // Picture Routes
  var pictureCtrl = require('../app/controllers/picture');
  app.post('/pictures', pictureCtrl.createPicture);

  // Category Routes
  var categories = require('../app/controllers/categories');
  app.param('categoryId', categories.findCategoryById);
  app.get('/api/categories', categories.readAll);
  app.post('/api/categories', categories.validate, categories.createCategory);
  app.get('/api/categories/:categoryId', categories.readCategory);
  app.put('/api/categories/:categoryId', categories.validate, categories.updateCategory);
  app.del('/api/categories/:categoryId', categories.deleteCategory);

  // Product Routes
  var products = require('../app/controllers/products');
  app.param('productId', products.findProductById);
  app.get('/api/products', products.readAllProducts);
  app.post('/api/products', auth.requiresLogin, products.createProduct);
  app.get('/api/products/:productId', products.readProduct);
  app.put('/api/products/:productId', auth.requiresLogin, products.updateProduct);
  app.del('/api/products/:productId', auth.requiresLogin, auth.admin.hasAuthorization, products.deleteProduct);

  // Bid Routes
  app.param('bidId', products.findProductBidById);
  app.get('/api/products/:productId/bids', products.readAllProductBids);
  app.post('/api/products/:productId/bids', products.createProductBid);
  app.get('/api/products/:productId/bids/:bidId', products.readProductBid);
  app.put('/api/products/:productId/bids/:bidId', products.updateProductBid);
  app.del('/api/products/:productId/bids/:bidId', products.deleteProductBid);

  // Seller Routes
  //  var sellers = require('../app/controllers/sellers');
  //  app.get('/api/sellers', sellers.readAllSellers);
  //  app.post('/api/sellers', auth.requiresLogin, sellers.createSeller);
  //  app.get('/api/sellers/:sellerId', sellers.readSeller);
  //  app.put('/api/sellers/:sellerId', auth.requiresLogin, sellers.updateSeller);
  //  app.del('/api/sellers/:sellerId', auth.requiresLogin, sellers.deleteSeller);

  // Seller Ratings Routes
  app.param('ratingId', users.findRatingById);
  app.get('/api/sellers/:userId/ratings', users.readAllRatings);
  app.get('/api/sellers/:userId/ratings/:ratingId', users.readRating);
  app.get('/api/sellers/:userId/avgRating', users.readAvgRating);
  app.get('/api/sellers/:userId/ratingGivenToSellerByUser', users.readRatingGivenToSeller);
  app.post('/api/sellers/:userId/ratings', users.createRating);

  // Seller Unsold Products Routes
  app.param('unsoldProductId', users.findUnsoldProductById);
  app.get('/api/sellers/:userId/unsoldProducts', users.readAllUnsoldProducts);
  app.post('/api/sellers/:userId/unsoldProducts', users.createUnsoldProduct);
  app.get('/api/sellers/:userId/unsoldProducts/:unsoldProductId', users.readUnsoldProduct);
  app.put('/api/sellers/:userId/unsoldProducts/:unsoldProductId', users.updateUnsoldProduct);
  app.del('/api/sellers/:userId/unsoldProducts/:unsoldProductId', users.deleteUnsoldProduct);

  // Carousel routes
  var carousels = require('../app/controllers/carousels');
  app.get('/api/carousels', carousels.readAllCarousels);

  //================ADMINISTRATOR ROUTES================//

  // Admin Routes
  var admins = require('../app/controllers/admins');

  app.all('/api/admins', auth.requiresLogin, auth.admin.hasAuthorization);
  app.all('/api/admins/*', auth.requiresLogin, auth.admin.hasAuthorization);

  app.param('adminId', admins.findAdminById);
  app.get('/api/admins', admins.readAllAdmins);
  app.post('/api/admins', admins.createAdmin);
  app.get('/api/admins/:adminId', admins.readAdmin);
  app.put('/api/admins/:adminId', admins.updateAdmin);
  app.del('/api/admins/:adminId', admins.deleteAdmin);

  // Report Routes

  app.param('reportIdDay', admins.findReportByIdDay);
  app.param('reportIdWeek', admins.findReportByIdWeek);
  app.param('reportIdMonth', admins.findReportByIdMonth);

  app.get('/api/reportsDay', admins.readAllReportsDay);
  app.get('/api/reportsWeek', admins.readAllReportsWeek);
  app.get('/api/reportsMonth', admins.readAllReportsMonth);

  app.get('/api/reportsDay/:reportIdDay', admins.readReportDay);
  app.get('/api/reportsWeek/:reportIdWeek', admins.readReportWeek);
  app.get('/api/reportsMonth/:reportIdMonth', admins.readReportMonth);

  app.get('/api/reportsDayTotal', admins.readReportDayTotal);
  app.get('/api/reportsWeekTotal', admins.readReportWeekTotal);
  app.get('/api/reportsMonthTotal', admins.readReportMonthTotal);

};
