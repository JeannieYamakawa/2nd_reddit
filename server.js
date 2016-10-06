'use strict';
const port = process.env.PORT || 8000;
const express = require('express');
const app = express();

const knex = require('./db/knex');

const morgan = require('morgan');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const path = require('path');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');


const ejs = require('ejs');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(cookieSession({
  name: 'trackify',
  secret: 'some_secret_key'
}));

app.set('view engine', 'ejs');


const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const auth = require('./routes/auth');


app.use('/users', users);
app.use('/posts', posts);
app.use('/comments', comments);
app.use('/auth', auth);




app.get('/', function(req, res, next) {
    res.render('home')
});


require('locus');





app.post('/', function(req,res){
    console.log(req.body.username, "*****req.body.username");
    knex('users').where({
        username: req.body.username
    })
    .first()
    .then(function(user,err) {
        if (!user) {
    bcrypt.hash(req.body.password, 10, function(err,hash){
        console.log(req.body.username, "*****req.body.username");
            knex('users').insert({
                username: req.body.username,
                password: hash,
                admin: req.body.admin
                })
                .then(function(err){
                    console.log(req, "*****req");
                req.session.user = req.body.username;
                console.log(req.session.user);
                res.cookie('loggedIn', true);
                res.redirect('/users/loggedInHome')
            });
          });
      } else {
          res.redirect('/users/loggedInHome');
      }
  });
})

router.post('/signup', function(req, res, next) {
    knex('users').where({
        email: req.body.email
    })
    .first()
    .then(function(user,err) {
        if (!user) {
            bcrypt.hash(req.body.password, 10, function(err,hash){
              knex('users').insert({
                email: req.body.email,
                hashed_password: hash
              })
              .then(function(){
                  req.session.username = username;
                  res.cookie('loggedIn', true);
                //   res.sendStatus(200);
                res.redirect('/secretarea');
              });
            });
        } else {
            res.redirect('/login');
        }
    });
})




app.listen(port, function(){
    console.log('Server is listening on port', port);

});

module.exports = app;
