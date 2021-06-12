const express = require('express');
const Authordata = require('../model/Authordata');
const authorsRouter = express.Router();
function router(nav){
// var authors = [
//     {
//        name:'Joseph Barbera',
//        age:'60',
//        type:'cartoon artist',
//        img:'JosephBarbera.jpg'
//     },
//     {
//        name:'J K Rowling',
//        age:'55',
//        type:'fantasy',
//        img:'JKRowling.jpg'
//     },
//     {
//        name:'Basheer',
//        age:'Basheer',
//        type:'novelist',
//        img:'Basheer1.jpg'
//     }
//  ]
 
 authorsRouter.get('/',function(req,res){
    // res.sendFile(__dirname+"/src/views/index.html");
    Authordata.find()
    .then(function(authors){
      res.render("authors",
      {
         nav,
         title:'Library',
         authors
      });
    })
    
 });
 
 authorsRouter.get('/:id',function(req,res){
    const id = req.params.id
    Authordata.findOne({_id:id})
    .then(function(author){
      res.render("author",
      {
         nav,
         title:'Library',
         author
      });
    })
    
 });





 return authorsRouter;
}
module.exports = router;
//module.exports = booksRouter;
