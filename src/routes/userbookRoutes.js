const express = require('express');
const Bookdata = require('../model/Bookdata');
const userbooksRouter = express.Router();
function router(nav){

userbooksRouter.get('/',function(req,res){
    // res.sendFile(__dirname+"/src/views/index.html");
    Bookdata.find()
    .then(function(books){
      res.render("userbooks",
      {
         nav,
         title:'Library',
         books
      });
    })
    
 });
 
 userbooksRouter.get('/:id',function(req,res){
    const id = req.params.id;
    Bookdata.findOne({_id:id})
    .then(function(book){
      res.render("userbook",
      {
         nav,
         title:'Library',
         book
      });
    })
    
 });

 return userbooksRouter;
}
module.exports = router;