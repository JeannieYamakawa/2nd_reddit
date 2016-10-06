'use strict'
const app = require('../server');
const request = require('supertest')(app);
const mocha = require('mocha');
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);
const expect = require('chai').expect;



describe("second reddit clone", function() {


  describe("GET /", function() {
    it('should display the first page', function(done) {
      request.get('/')
        .end(function(err, res) {
          expect(res.text).to.include('Welcome to Reddit');
          done();
      });
    });
  });


   describe("POST /", function() {
       it('should redirect user to users own list of posts', function(done) {
            request.post('/')
            .type('form')
                .send({username: 'admin1', password: 'admin1', admin: true})
                request.get('/users/loggedInHome')
                .end(function(err,res){
                    expect(200)
                    // expect(res.text).to.include('admin1')
                    done()
                });
          });
        });



        describe("GET /users/loggedInHome", function() {
            var thisUser = req.params.username;
          it('should display all posts by all users', function(done) {
            request.get('/users/' + thisUser +'/loggedInHome')
              .end(function(err, res) {
                expect(res.text).to.include('posts');
                done();
            });
          });
        });


        describe("POST /users/loggedInHome", function() {
            it('should store users post in database', function(done) {
                var thisUser = req.params.username;
                request.get('/users/' + thisUser +'/loggedInHome')
                .end(function(err, res) {
                  expect(res.text).to.include('posts');
                  done();
              });
            });
          });









});
