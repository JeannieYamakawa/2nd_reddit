'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')






router.get('/loggedInHome', function(req, res) {
    var thisUser = req.session.username;
    console.log(thisUser, "****thisUser");
    //if the user is an admin, display a button to delete the post.
    // var isAdmin;
knex('users').where('username', thisUser.username)
    .first()
    .then(function(data){
    console.log(data, "data");
    //find out if the user who has logged in is an admin.
    if(data.admin == true){
        knex('posts').then(function(data){
        console.log(data,"***data from 24");
        res.render('users/show', {myPostsAdmin:data, thisUser:thisUser, myPostsNotAdmin: false})
    })
    }else{
        knex('posts').then(function(data){
    res.render('users/show', {myPostsNotAdmin:data,  thisUser:thisUser,myPostsAdmin: false})
    })
    }
})
});



router.post('/loggedInHome', function(req, res) {
    var wholePost = req.body;
    var thisUser = req.params.username;
    if(wholePost.content_link.indexOf("http")==-1){
            wholePost.content_link = "http://" + wholePost.content_link;
            if(wholePost.content_link.indexOf(".com")==-1){
                wholePost.content_link = wholePost.content_link + ".com" ;
            }
        }
    knex('posts').insert(wholePost)
        .then(function(err){
            res.redirect('/users/loggedInHome')
        })
});






module.exports = router;
