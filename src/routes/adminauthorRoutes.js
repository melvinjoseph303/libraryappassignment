const express = require('express');
const adminauthorRouter = express.Router();
const Authordata = require('../model/Authordata');
//--------------------------------------------------------------------//
var fs = require("fs");
var multer  = require('multer');
adminauthorRouter.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})


var storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, './public/images')
   },
   filename: function (req, file, cb) {
       var ext = require('path').extname(file.originalname);
       ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
       require('crypto').pseudoRandomBytes(16, function (err, raw) {
           cb(null, (err ? undefined : raw.toString('hex') ) + ext);
           //cb(null, (err ? undefined : file.originalname ));
       });
   }
});

var upload = multer({ storage: storage });
//--------------------------------------------------------------------//
function router(nav){

 
 adminauthorRouter.get('/',function(req,res){
    // res.sendFile(__dirname+"/src/views/index.html");
    res.render("addauthor",
    {
       nav,
       title:'Library'

    });
 });
 
 //adminauthorRouter.post('/add',function(req,res){
   adminauthorRouter.post('/add', upload.single("file"), function (req, res) {
   // res.sendFile(__dirname+"/src/views/index.html");
  // res.send("book added");
var item = {
   name: req.body.name,
   age: req.body.age,
   type: req.body.type,
   image: req.file.filename
}
   var author = Authordata(item);
   author.save();
   res.redirect('/authors');
});

adminauthorRouter.get('/:id/edit',function(req,res){
    const id = req.params.id;
    Authordata.findOne({_id:id})
    .then(function(author){
      res.render("editauthor",
      {
         nav,
         title:'Library',
         author
      });
    })
 });   
 
 //adminauthorRouter.post('/:id/update',function(req,res){
adminauthorRouter.post('/:id/update', upload.single("file"), function(req,res){
    // res.sendFile(__dirname+"/src/views/index.html");
   // res.send("book added");
   let authordetails;
   const id = req.params.id;
   //Bookdata.findOne({_id:id})
   authordetails = Authordata.findById(req.params.id)
   .then(function(authordetails){
    authordetails.name = req.body.name;
    authordetails.age = req.body.age;
    authordetails.type = req.body.type;
    authordetails.image = req.file.filename;
 //   .then(function(book){
 //    var item = {
 //       title: req.body.title,
 //       author: req.body.author,
 //       genre: req.body.genre,
 //       image: req.body.image
 //    }
       //var book = Bookdata(item);
       authordetails.save();
       res.redirect(`/authors/${authordetails._id}`);
  })
 
 });
 
 adminauthorRouter.get('/:id/delete',function(req,res){
    // res.sendFile(__dirname+"/src/views/index.html");
   // res.send("book added");
   const id = req.params.id;
   authordetails = Authordata.findById(id)
   .then(function(authordetails){
    authordetails.remove();
   res.redirect('/authors');
   })
 
 });

//  adminRouter.get('/signup',function(req,res){

//     res.render("signup",
//     {
//        nav,
//        title:'Library'

//     });
//  });
 return adminauthorRouter;
}
module.exports = router;
//module.exports = booksRouter;
