const express = require('express');
const app = express();
let currentuser;
//---------------------------------------------------------------------//
var fs = require("fs");
var multer  = require('multer');
app.get('/index.htm', function (req, res) {
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
       });
   }
});
//--------------------------------------------------------------------//
const mongoose = require("mongoose"),
passport = require("passport"),
bodyParser = require("body-parser"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = 
    require("passport-local-mongoose"),
User = require("./src/model/Userdata");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//mongoose.connect("mongodb://localhost/library");
//--------------------------------------------------------------------//
const port = process.env.PORT || 3000
const nav = [
   {
      link:'/books',name:'Books'
   },
   {
      link:'/authors',name:'Authors'
   },
   {
      link:'/admin',name:'AddBook'
   },
   {
      link:'/adminauthor',name:'AddAuthor'
   },
   {
      link:'/logout',name:'Logout'
   }
];
const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const adminauthorRouter = require('./src/routes/adminauthorRoutes')(nav);
const userbooksRouter = require('./src/routes/userbookRoutes')(nav);
const userauthorsRouter = require('./src/routes/userauthorRoutes')(nav);
//const userRouter = require('./src/routes/userRoutes')(nav);
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/admin',adminRouter);
app.use('/adminauthor',adminauthorRouter);
app.use('/userbooks',userbooksRouter);
app.use('/userauthors',userauthorsRouter);
//app.use('/user',userRouter);
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
//-------------------------------------------------------------------//
app.use(bodyParser.urlencoded({ extended: true }));
  
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  
//=====================
// ROUTES
//=====================
  
// Showing home page
// app.get("/", function (req, res) {
//     //res.render("index");
//     res.render("index",
//    {
//       nav,
//       title:'Library',
//       data
//    });
// });
  
// Showing secret page
app.get("/", isLoggedIn, function (req, res) {
    //res.render("index");
    currentuser=req.user.username;
    if(req.user.username=='admin30@gmail.com')
    {
         res.render("adminview",
         {
            nav,
            title:'Library'
         }); 
    }
   else
   {
      res.render("userview",
      {
         nav,
         title:'Library'
      });
   } 
   
});
  
// Showing register form
// app.get("/register", function (req, res) {
//     res.render("register");
// });
  
// Handling user signup
// app.post("/register", function (req, res) {
//     var username = req.body.username
//     var password = req.body.password
//     var phoneno = req.body.phoneno
//     User.register(new User({ username: username }),
//             password, phoneno, function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.render("signup");
//         }
  
//         passport.authenticate("local")(
//             req, res, function () {
//             res.render("index");
//         });
//     });
// });
app.post("/register",(req,res)=>{
    
   User.register(new User({username: req.body.username,phone:req.body.phoneno}),req.body.password,function(err,user){
       if(err){
           console.log(err);
          // res.render("signup");
          res.render("signup",
            {
               nav,
               title:'Library'
            });
       }
   passport.authenticate("local")(req,res,function(){
       res.redirect("/login");
   })    
   })
})
  
//Showing login form
// app.get("/login", function (req, res) {
//     res.render("login");
// });
  
//Handling user login
// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login"
// }), function (req, res) {
// });
app.post("/login", passport.authenticate("local", {
   failureRedirect: "/login"
}), function (req, res) {
   res.locals.currentUser = req.user;
   //user = User.findOne({username:req.body.username});
   //console.log("user:"+user.username);
   User.findOne({username:req.body.username},function(err,data){
      console.log("user:"+data.username);
      currentuser=data.username;
   //if(data.username=='admin' && data.password=='admin')
   if(data.username === 'admin30@gmail.com')
   {console.log("data:"+data.username);
      res.render("adminview",
      {
         nav,
         title:'Library',
         data
      });
   }
   else {
      //res.redirect("/");
      res.render("userview",
      {
         nav,
         title:'Library',
         data
      });
   }
})
});
  
//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
  
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

// app.use(function(req, res, next) {

//     res.locals.currentUser = req.user;
// });
//-------------------------------------------------------------------//
var upload = multer({ storage: storage });

app.post('/file_upload', upload.any(), function (req, res, next) {
   cosole.log('file uploaded');
    res.send(req.files);
});

//-------------------------------------------------------------------//
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

// app.get('/addbook',function(req,res){
//    // res.sendFile(__dirname+"/src/views/index.html");
//    res.render("addbook",
//    {
//       nav,
//       title:'Library'
//    });
// });

// app.get('/addauthor',function(req,res){
//    // res.sendFile(__dirname+"/src/views/index.html");
//    res.render("addauthor",
//    {
//       nav,
//       title:'Library'
//    });
// });

//app.listen(5000); 
app.listen(port,()=>{console.log(`server running at port:` + port)});
