const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const nav = [
   {
      link:'/books',name:'Books'
   },
   {
      link:'/authors',name:'Authors'
   },
   {
      link:'/signup',name:'Signup'
   },
   {
      link:'/login',name:'Login'
   },
   {
      link:'/addbook',name:'AddBook'
   },
   {
      link:'/addauthor',name:'AddAuthor'
   }
];
const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
//const loginRouter = require('./src/routes/loginRoutes')(nav);
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
//app.use('/signup',loginRouter);
//app.use('/login',loginRouter);
app.get('/',function(req,res){
   // res.sendFile(__dirname+"/src/views/index.html");
   res.render("index",
   {
      nav,
      title:'Library'
   });
});

app.get('/login',function(req,res){
   // res.sendFile(__dirname+"/src/views/index.html");
   res.render("login",
   {
      nav,
      title:'Library'
   });
});

app.get('/signup',function(req,res){
   // res.sendFile(__dirname+"/src/views/index.html");
   res.render("signup",
   {
      nav,
      title:'Library'
   });
});

app.get('/addbook',function(req,res){
   // res.sendFile(__dirname+"/src/views/index.html");
   res.render("addbook",
   {
      nav,
      title:'Library'
   });
});

app.get('/addauthor',function(req,res){
   // res.sendFile(__dirname+"/src/views/index.html");
   res.render("addauthor",
   {
      nav,
      title:'Library'
   });
});

//app.listen(5000); 
app.listen(port,()=>{console.log(`server running at port:` + port)});