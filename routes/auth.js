'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt');
const methodOverride = require('method-override')


router.get('/login', function( req, res, next) {
    // res.send('login page workin')
  res.render('login', {error: false})
})


router.post('/login', function(req,res, next){
    var usersName = req.body.username;
    // console.log(usersName);
    knex('users')
    .where('username', usersName)
    .first()
    .then(function(user,err){
        // console.log(user, "user from database")
        if (!user){
            return res.sendStatus(404)
        }else{
            // console.log(user);
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(!result){
                res.render('login', {error: "Error: Invalid username or password. Please try again."})
                next();
            } else {
                req.session.username = req.body.username;
                req.session.loggedIn = true;
                res.redirect('/users/loggedInHome');

            }
        })
    }
    })
})

router.get('/logout', function(req, res) {
    req.session = null
    res.redirect('/');
});


//
//
// router.delete('/secretarea', function(req, res) {
//   req.session = null;
//   res.clearCookie('loggedIn');
//   // res.sendStatus(200);
// res.redirect('signup')
// });






module.exports = router;
