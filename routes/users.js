'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt');
const methodOverride = require('method-override')






router.get('/loggedInHome', function(req, res) {
    var thisUser = req.session.username;
    // console.log(thisUser, "****thisUser");
    //if the user is an admin, display a button to delete the post.
    // var isAdmin;
    knex('users').where('username', thisUser)
    .first()
    .then(function(data){

    console.log(data, "data");
    //find out if the user who has logged in is an admin.
        if(data.admin == true){
            knex('posts').then(function(data){
            // console.log(data,"***posts data from 24");
            res.render('users/show', {myPostsAdmin:data, thisUser:thisUser, myPostsNotAdmin: false})
        })
        }else{
            knex('posts').then(function(data){
                var allPosts = data;
                knex('posts').where('username', thisUser).then(function(thisUsersData){
                    var thisUsersPosts = thisUsersData;
                    knex('posts').whereNot('username',thisUser).then(function(otherUsersData){
                        var myPostsNotAdmin = otherUsersData;
                        console.log(myPostsNotAdmin, "***myPostsNotAdmin, should be everyone else's posts");
                        res.render('users/show', {myPostsNotAdmin:myPostsNotAdmin, thisUser:thisUser, myPostsAdmin: false, thisUsersPosts: thisUsersPosts})
                    })
                })
        })
        }
})
});





router.get('/loggedOutHome', function(req, res) {
    var thisUser;
        knex('posts').then(function(data){
            res.render('users/showNotLoggedIn', {myPostsAdmin:false, thisUser:thisUser, myPostsNotAdmin: data})
})
});



router.post('/loggedInHome', function(req, res) {
    var wholePost = req.body;
    var thisUser = req.session.username;
    req.body.username = thisUser;
    // console.log(thisUser, "*****thisUser from post route");
    // console.log(req.body.username, "****req.body.username populated?");
    if(wholePost.content_link.indexOf("http")==-1){
            wholePost.content_link = "http://" + wholePost.content_link;
            if(wholePost.content_link.indexOf(".")==-1){
                wholePost.content_link = wholePost.content_link + ".com" ;
            }
        }
    knex('posts').insert(wholePost)
        .then(function(err){
            res.redirect('/users/loggedInHome')
        })
});






module.exports = router;
