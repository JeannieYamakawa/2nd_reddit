'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');




//if someone is an admin, they can edit or delete any post.
//if not admin, they can edit posts where the username is equal to their req.session.username

router.get('/:id', function(req,res){
        var postTitle = req.params.id
        knex('posts').where('id','=', postTitle).then(function(data){
            var myPost = data[0];
            console.log(myPost.title, "***myPost");
            knex('comments').where('post_id', postTitle).then(function(returnedData){
                var adminAllComments =[];
                var usersOwnComments = [];
                var othersComments = [];
                if(req.session.admin == true){
                    returnedData.forEach(function(thing){
                        adminAllComments.push(thing)
                    })
            }
                else{
                    // adminAllComments = [0]
                    for(var i = 0; i<returnedData.length; i++){
                        if(returnedData[i].by_username == req.session.username){
                            usersOwnComments.push(returnedData[i])
                        }else{
                            othersComments.push(returnedData[i])
                        }
                    }
                }
                res.render('comments/commentsindex', {myPost: myPost, adminAllComments: adminAllComments, usersOwnComments:usersOwnComments, othersComments:othersComments})
            })
        })
})

router.post('/:id', function(req, res){
    var wholeComment = req.body;
    var iD = req.body.post_id;
    var postId = req.params.id;
    wholeComment.by_username = req.session.username;
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
            res.redirect('/posts/'+ postId )
        }
    )
})

router.delete('/:id', function(req, res){
        var postToDelete = req.params.id;
        knex('posts').where('id', postToDelete).del()
            .then(function(){
                res.redirect('/users/loggedInHome')
            })
})


//////////////comments//////////////
router.get('/:id/comments', function(req,res){
    var postId = req.params.id;
    knex('posts').innerJoin('comments', 'posts.id', 'comments.post_id').then(function(data){
        var myPost = data[0];
        var myPostComments = [];
        var usersOwnComments = [];
        var othersComments = [];
        for (var i = 0; i < data.length; i++){
            if(data[i].post_id == postId){
                myPostComments.push(data[i])
            }
        }
    if(req.session.admin ===true){
        var adminAllComments = myPostComments;
    }
    else{
        for(var i = 0; i<myPostComments.length; i++){
            if(myPostComments[i].by_username==req.session.username){
                usersOwnComments.push(myPostComments[i])
            }else{
                othersComments.push(myPostComments[i])
            }
        }
    }
    console.log(myPost.title, "***myPost");

    console.log(adminAllComments, "**adminall comments");
    console.log(usersOwnComments);
    console.log(othersComments);
    res.render('comments/commentsindex', {myPost:myPost, adminAllComments: adminAllComments, usersOwnComments:usersOwnComments, othersComments:othersComments})
// res.send(specificPostComments)
})
})

router.get('/:id/comments/:iD', function(req,res){
    var postId = req.params.id;
    var commentId = req.params.iD
    knex('comments').where({id: commentId, post_id: postId})
        .then(function(data){
            var myComment = data[0]
    // res.send(myComment)
    res.render('comments/commentsedit', {myPostComments: myComment})
})

})




router.delete('/:id/comments/:iD', function(req,res){
    var postId = req.params.id
    var commentId = req.params.iD;
    knex('comments').where({id: commentId, post_id: postId}).del()
    .then(function(){
        res.redirect('/posts/'+postId+'/comments')
    })
})




router.put('/:id/comments/:iD', function(req, res){
    var postId = req.params.id;
    var commentId = req.params.iD
    var commentText = req.body.comment_text;
    knex('comments').where({id: commentId, post_id: postId})
    .update({comment_text: commentText}).then(
        function(){
            res.redirect('/posts/'+postId+"/comments")
        }
    )
})





module.exports = router;
