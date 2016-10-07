'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');




//if someone is an admin, they can edit or delete any post.
//if not admin, they can edit posts where the username is equal to their req.session.username

router.delete('/:id', function(req, res){
        var postToDelete = req.params.id;
        knex('posts').where('id', postToDelete).del()
            .then(function(){
                res.redirect('/users/loggedInHome')
            })
})

router.post('/:id', function(req, res){
    var wholeComment = req.body;
    var iD = req.body.post_id;
    var postId = req.params.id;
    knex('comments').where('post_id', postId)
    .insert(wholeComment).then(function(){
        res.redirect('/posts/'+iD+'/comments')
    })
})



router.get('/:id/edit', function(req,res){
    var postToEdit = req.params.id;
    knex('posts').where('id','=', postToEdit).then(function(data){
        var myPost = data[0];
        res.render("posts/postsedit", {myPost:myPost})
    })

})




router.put('/:id', function(req, res){
    var postId = req.params.id;
    var wholePost = req.body;
    var postTitle = req.body.title;
    //verify that the edited post contains an actual link.
    if(wholePost.content_link.indexOf("http")==-1){
            wholePost.content_link = "http://" + wholePost.content_link;
            if(wholePost.content_link.indexOf(".")==-1){
                wholePost.content_link = wholePost.content_link + ".com" ;
            }
        }
        var contentLink = wholePost.content_link;
    knex('posts').where('id', req.body.id).update({content_link: contentLink, title: postTitle}).then(
        function(){
            res.redirect('/posts/'+ postId)
        }
    )
})



router.get('/:id', function(req,res){
        var postTitle = req.params.id
        knex('posts').where('id','=', postTitle).then(function(data){
            var myPost = data[0];
            res.render('posts/postsshow', {myPost:myPost})
        // res.send(data)
        })
    })



module.exports = router;
