const express = require('express');
const loginRouter = express.Router();
function router(nav){

 
 loginRouter.get('/login',function(req,res){
    // res.sendFile(__dirname+"/src/views/index.html");
    res.render("login",
    {
       nav,
       title:'Library'

    });
 });
 
 loginRouter.get('/signup',function(req,res){

    res.render("signup",
    {
       nav,
       title:'Library'

    });
 });
 return loginRouter;
}
module.exports = router;
//module.exports = booksRouter;