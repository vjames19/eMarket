'use strict';

module.exports = function (app, passport, auth) {
  // TODO: Create routes and its respectives controllers.
  // User Routes
  var users = require('../app/controllers/users');
  app.post('/login', passport.authenticate('local'), function (req, res) {
    res.jsonp(req.user);
  });
  // TODO(vjames19): Secure users api
  app.param('userId', users.findUserById);
  app.get('/api/users', users.readAllUsers);
  app.post('/api/users', users.createUser);
  app.get('/api/users/:userId', users.readUser);
  app.put('/api/users/:userId', users.updateUser);
  app.del('/api/users/:userId', users.deleteUser);

  app.param('draftId', users.findDraftById);
  app.get('/api/users/:userId/drafts', users.readAllDrafts);
  app.post('/api/users/:userId/drafts', users.createDraft);
  app.get('/api/users/:userId/drafts/:draftId', users.readDraft);
  app.put('/api/users/:userId/drafts/:draftId', users.updateDraft);
  app.del('/api/users/:userId/drafts/:draftId', users.deleteDraft);

  app.param('invoiceId', users.findInvoiceById);
  app.get('/api/users/:userId/invoices', users.readAllInvoices);
  app.post('/api/users/:userId/invoices', users.createInvoice);
  app.get('/api/users/:userId/invoices/:invoiceId', users.readInvoice);
  app.put('/api/users/:userId/invoices/:invoiceId', users.updateInvoice);
  app.del('/api/users/:userId/invoices/:invoiceId', users.deleteInvoice);

  app.param('mailAddressId', users.findMailAddressById);
  app.get('/api/users/:userId/mailAddresses', users.readAllMailAddresses);
  app.post('/api/users/:userId/mailAddresses', users.createMailAddress);
  app.get('/api/users/:userId/mailAddresses/:mailAddressId', users.readMailAddress);
  app.put('/api/users/:userId/mailAddresses/:mailAddressId', users.updateMailAddress);
  app.del('/api/users/:userId/mailAddresses/:mailAddressId', users.deleteMailAddress);


  // Category Routes
  var categories = require('../app/controllers/categories');
  app.param('categoryId', categories.findCategoryById);
  app.get('/api/categories', categories.readAll);
  app.post('/api/categories', auth.requiresLogin, auth.admin.hasAuthorization, categories.createCategory);
  app.get('/api/categories/:categoryId', categories.readCategory);
  app.put('/api/categories/:categoryId', auth.requiresLogin, auth.admin.hasAuthorization, categories.updateCategory);
  app.del('/api/categories/:categoryId', auth.requiresLogin, auth.admin.hasAuthorization, categories.deleteCategory);

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
  app.post('/api/products/:productId/bids', auth.requiresLogin, products.createProductBid);
  app.get('/api/products/:productId/bids/:bidId', products.readProductBid);
  app.put('/api/products/:productId/bids/:bidId', auth.requiresLogin, products.updateProductBid);
  app.del('/api/products/:productId/bids/:bidId', auth.requiresLogin, auth.admin.hasAuthorization,
      products.deleteProductBid);

  // Seller Routes
  var sellers = require('../app/controllers/sellers');
  app.param('sellerId', sellers.findSellerById);
  app.get('/api/sellers', sellers.readAllSellers);
  app.post('/api/sellers', auth.requiresLogin, sellers.createSeller);
  app.get('/api/sellers/:sellerId', sellers.readSeller);
  app.put('/api/sellers/:sellerId', auth.requiresLogin, sellers.updateSeller);
  app.del('/api/sellers/:sellerId', auth.requiresLogin, sellers.deleteSeller);

  // Admin Routes
  var admins = require('../app/controllers/admins');
  app.param('adminId', admins.findAdminById);
  app.get('/api/admins', admins.readAllAdmins);
  app.post('/api/admins', admins.createAdmin);
  app.get('/api/admins/:adminId', admins.readAdmin);
  app.put('/api/admins/:adminId', admins.updateAdmin);
  app.del('/api/admins/:adminId', admins.deleteAdmin);

  // Report Routes
  app.param('reportId', admins.findAdminReportById);
  app.get('/api/admins/:adminId/reports', admins.readAllAdminReports);
  app.post('/api/admins/:adminId/reports', admins.createAdminReport);
  app.get('/api/admins/:adminId/reports/:reportId', admins.readAdminReport);
  app.put('/api/admins/:adminId/reports/:reportId', admins.updateAdminReport);
  app.del('/api/admins/:adminId/reports/:reportId', admins.deleteAdminReport);

};
