//
// var environment = 'development';
// var config = require('../knexfile.js')[environment];
// module.exports = require('knex')(config);


const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

console.log('the environment is ' + env);

module.exports = knex;
