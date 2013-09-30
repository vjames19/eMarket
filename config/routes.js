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
  app.get('/users/:userId', users.show);

  // Finish with setting up the userId param
  app.param('userId', users.user);

  // Category Routes
  var categories = require('../app/controllers/categories');
  // Finish with setting up the categoryId param
  app.param('categoryId', categories.findCategoryById);
  app.get('/api/categories', categories.readAll);
  app.post('/api/categories', categories.createCategory);
  app.get('/api/categories/:categoryId', categories.readProduct);
  app.put('/api/categories/:categoryId', categories.updateCategory);
  app.del('/api/categories/:categoryId', auth.requiresLogin, categories.deleteCategory);

  // products Routes
  // TODO: uncomment when the product controller is implemented
//  var products = require('../app/controllers/products');
//  app.param('productId', products.findProductById);
//  app.param('bidId', products.findProductBidById);
//  app.get('/api/products', products.readAll);
//  app.post('/api/products', products.createProduct)
//  app.get('/api/products/:productId', products.readProduct);
//  app.put('/api/products/:productId', products.updateProduct);
//  app.del('/api/products/:productId', products.deleteProduct);
//  // Bid Routes
//  app.get('/api/products/:productId/bids', products.readAllProductBids);
//  app.post('/api/products/:productId/bids', products.createProductBid);
//  app.get('/api/products/:productId/bids/:bidId', products.readProductBid);
//  app.put('/api/products/:productId/bids/:bidId', products.updateProductBid);
//  app.put('/api/products/:productId/bids/:bidId', products.deleteProductBid);
};
