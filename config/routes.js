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
  app.get('/api/categories/:categoryId', categories.readCategory);
  app.put('/api/categories/:categoryId', categories.updateCategory);
  app.del('/api/categories/:categoryId', auth.requiresLogin, categories.deleteCategory);

  //  var products = require('../app/controllers/products');
  //  app.get('/categories', categories.all);
  //  app.post('/categories', auth.requiresLogin, categories.create);
  //  app.get('/categories/:categoryId', categories.show);
  //  app.put('/categories/:categoryId', auth.requiresLogin, auth.article.hasAuthorization, categories.update);
  //  app.del('/categories/:categoryId', auth.requiresLogin, auth.article.hasAuthorization, categories.destroy);
};
