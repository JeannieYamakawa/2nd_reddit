'use strict';
const port = process.env.PORT || 8000;
const express = require('express');
const app = express();

const knex = require('./db/knex');

const morgan = require('morgan');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const path = require('path');

const ejs = require('ejs');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('_method'))


app.set('view engine', 'ejs');


const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

app.use('/', users);
app.use('/', posts);
app.use('/', comments);



app.get('/', function(req, res, next) {
    res.send('booyah!')
});


app.listen(port, function(){
    console.log('Server is listening on port', port);

});

module.exports = app;
