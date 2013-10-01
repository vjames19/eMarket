'use strict';

module.exports = function(app, passport, auth) {
  // TODO: Create routes and its respectives controllers.
  // User Routes
  var users = require('../app/controllers/users');
  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/signout', users.signout);

  // Setting up the users api
  app.post('/users', users.create);

  app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password.'
  }), users.session);

  app.get('/users/me', users.me);
  app.get('/users/:userID', users.show);

  // Finish with setting up the userID param
  app.param('userID', users.user);

  // Category Routes
  var categories = require('../app/controllers/categories');
  // Finish with setting up the categoryID param
  app.param('categoryID', categories.findCategoryByID);
  app.get('/api/categories', categories.readAll);
  app.post('/api/categories', categories.createCategory);
  app.get('/api/categories/:categoryID', categories.readCategory);
  app.put('/api/categories/:categoryID', categories.updateCategory);
  app.del('/api/categories/:categoryID', auth.requiresLogin, categories.deleteCategory);

  // products Routes
  var products = require('../app/controllers/products');
  app.param('productID', products.findProductByID);
  app.get('/api/products', products.readAllProducts);
  app.post('/api/products', products.createProduct);
  app.get('/api/products/:productID', products.readProduct);
  app.put('/api/products/:productID', products.updateProduct);
  app.del('/api/products/:productID', products.deleteProduct);

  // Bid Routes
  app.param('bidID', products.findProductBidByID);
  app.get('/api/products/:productID/bids', products.readAllProductBids);
  app.post('/api/products/:productID/bids', products.createProductBid);
  app.get('/api/products/:productID/bids/:bidID', products.readProductBid);
  app.put('/api/products/:productID/bids/:bidID', products.updateProductBid);
  app.del('/api/products/:productID/bids/:bidID', products.deleteProductBid);

  // Seller Routes
  var sellers = require('../app/controllers/sellers');
  app.param('sellerID', sellers.findSellerByID);
  app.get('/api/sellers', sellers.readAllSellers);
  app.post('/api/sellers', sellers.createSeller);
  app.get('/api/sellers/:sellerID', sellers.readSeller);
  app.put('/api/sellers/:sellerID', sellers.updateSeller);
  app.del('/api/sellers/:sellerID', sellers.deleteSeller);

};
