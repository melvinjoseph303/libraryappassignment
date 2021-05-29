const express = require('express');
const booksRouter = express.Router();
function router(nav){
var books = [
    {
       title:'Tom And Jerry',
       author:'Joseph Barbera',
       genre:'cartoon',
       img:'TomandJerry.jpg'
    },
    {
       title:'Harry Potter',
       author:'J K Rowling',
       genre:'fantasy',
       img:'harrypotter.jpg'
    },
    {
       title:'Paathummayude Aadu',
       author:'Basheer',
       genre:'drama',
       img:'Basheer.jpg'
    }
 ]
 
 booksRouter.get('/',function(req,res){
    // res.sendFile(__dirname+"/src/views/index.html");
    res.render("books",
    {
       nav,
       title:'Library',
       books
    });
 });
 
 booksRouter.get('/:id',function(req,res){
    const id = req.params.id
    res.render("book",
    {
       nav,
       title:'Library',
       book: books[id]
    });
 });
 return booksRouter;
}
module.exports = router;
//module.exports = booksRouter;