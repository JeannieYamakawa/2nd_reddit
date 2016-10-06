var app = require('../server');
var request = require('supertest')(app);
var config = require('../knexfile')[process.env.NODE_ENV];
var knex = require('knex')(config);
var expect = require('chai').expect;




describe("/", function() {

  // after(function(done){
  //   knex('users').del().then(function(err){
  //     done();
  //   })
  // });



  // describe("signup page", function() {
  //   it('displays a signup form', function(done) {
  //
  //     request.get('/signup')
  //       .end(function(err, res) {
  //         expect(res.status).to.equal(200);
  //         expect(res.text).to.include('<input type="text" name="email">');
  //         expect(res.text).to.include('<input type="password" name="password">');
  //         done();
  //       });
  //
  //   });
  // });



});
