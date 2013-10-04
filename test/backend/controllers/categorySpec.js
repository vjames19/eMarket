'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../../server.js');
request = request.agent(app);

describe('Category resource', function(){
  describe('GET /api/category', function(){
    it('respond with a collection of categories', function(done){
      request
          .get('/api/categories')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if(err) {done(err);}
            expect(res.body.length).to.eql(3);
            done();
          });
    });
  });

  describe('authenticated methods', function() {
    beforeEach(function() {
      request
          .post('/login')
          .send({username: 'admin', password: 'password'})
          .end(function() {});
    });

    it('should be able to login', function(done) {
      request
          .post('/login')
          .send({username: 'user', password: 'password'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            expect(err).to.not.exist;
            expect(res.body).to.contain.keys('username', 'password');
            done();
          });
    });

    it('should be able to modify a category', function(done) {
      var newCategory = {categoryName: 'window', categoryParent: null};
      request
          .post('/api/categories')
          .send(newCategory)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            console.log(res.body);
            expect(err).to.not.exist;
            expect(res.body).to.contain.keys('categoryName', 'categoryParent', 'categoryId');
            done();
          });
    });
  });
});

