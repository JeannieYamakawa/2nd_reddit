'use strict'
const app = require('../server');
const request = require('supertest')(app);
const mocha = require('mocha');
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);
const expect = require('chai').expect;



describe("second reddit clone", function() {


  describe("/", function() {
    it('should display the first page', function(done) {
      request.get('/')
        .end(function(err, res) {
          expect(res.text).to.include('first test fails');
          done();
      });
    });
  });



});
