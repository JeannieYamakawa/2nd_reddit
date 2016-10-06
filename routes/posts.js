'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');







router.delete('/:id', function(req, res){
        var postToDelete = req.params.id;
        knex('posts').where('id', postToDelete).del()
            .then(function(){
                res.redirect('/users/loggedInHome')
            })
})



module.exports = router;
