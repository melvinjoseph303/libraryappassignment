const express = require('express');
const Authordata = require('../model/Authordata');
const userauthorsRouter = express.Router();
function router(nav){
    userauthorsRouter.get('/',function(req,res){
        // res.sendFile(__dirname+"/src/views/index.html");
        Authordata.find()
        .then(function(authors){
        res.render("userauthors",
        {
            nav,
            title:'Library',
            authors
        });
        })
        
    });
    
    userauthorsRouter.get('/:id',function(req,res){
        const id = req.params.id
        Authordata.findOne({_id:id})
        .then(function(author){
        res.render("userauthor",
        {
            nav,
            title:'Library',
            author
        });
        })
        
    });
 
 
  return userauthorsRouter;
 }
 module.exports = router;