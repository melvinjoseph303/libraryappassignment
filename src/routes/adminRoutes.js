const express = require('express');
const adminRouter = express.Router();
const Bookdata = require('../model/Bookdata');
//--------------------------------------------------------------------//
var fs = require("fs");
var multer  = require('multer');
adminRouter.get('/index.htm', function (req, res) {
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

 
 adminRouter.get('/',function(req,res){
    // res.sendFile(__dirname+"/src/views/index.html");
    res.render("addbook",
    {
       nav,
       title:'Library'

    });
 });
 
 //adminRouter.post('/add',function(req,res){
 //  adminRouter.post('/add', upload.any(), function(req,res){
   adminRouter.post('/add', upload.single("file"), function (req, res) {
   // res.sendFile(__dirname+"/src/views/index.html");
  // res.send("book added");
  console.log("filename:"+req.file.filename);
var item = {
   title: req.body.title,
   author: req.body.author,
   genre: req.body.genre,
   image: req.file.filename
}
   var book = Bookdata(item);
   book.save();
   //res.send(req.files);
   res.redirect('/books');
});

adminRouter.get('/:id/edit',function(req,res){
   const id = req.params.id;
   Bookdata.findOne({_id:id})
   .then(function(book){
     res.render("editbook",
     {
        nav,
        title:'Library',
        book
     });
   })
});   

//adminRouter.post('/:id/update',function(req,res){
adminRouter.post('/:id/update',  upload.single("file"), function(req,res){
   // res.sendFile(__dirname+"/src/views/index.html");
  // res.send("book added");
  let bookdetails;
  const id = req.params.id;
  //Bookdata.findOne({_id:id})
  bookdetails = Bookdata.findById(req.params.id)
  .then(function(bookdetails){
  bookdetails.title = req.body.title;
  bookdetails.author = req.body.author;
  bookdetails.genre = req.body.genre;
  bookdetails.image = req.file.filename;
//   .then(function(book){
//    var item = {
//       title: req.body.title,
//       author: req.body.author,
//       genre: req.body.genre,
//       image: req.body.image
//    }
      //var book = Bookdata(item);
      bookdetails.save();
      res.redirect(`/books/${bookdetails._id}`);
 })

});

adminRouter.get('/:id/delete',function(req,res){
   // res.sendFile(__dirname+"/src/views/index.html");
  // res.send("book added");
  const id = req.params.id;
  bookdetails = Bookdata.findById(id)
  .then(function(bookdetails){
  bookdetails.remove();
  res.redirect('/books');
  })

});
//  adminRouter.get('/signup',function(req,res){

//     res.render("signup",
//     {
//        nav,
//        title:'Library'

//     });
//  });
 return adminRouter;
}
module.exports = router;
//module.exports = booksRouter;