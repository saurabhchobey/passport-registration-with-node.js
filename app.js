const express=require('express'); 
const expressLayouts= require('express-ejs-layouts');
const mongoose= require('mongoose')
const flash =require('connect-flash');
const passport = require('passport');
const session =require('express-session');
var bodyParser = require('body-parser');
const app= express();
const db = require('./config/keys').MongoURI ;
mongoose.connect(db , {useNewUrlParser : true})
.then(()=> console.log("mongodb connected"))
.catch(err => console.log(err));

app.use(expressLayouts);


app.use(bodyParser.urlencoded({ extended:false}));
app.set('view engine', 'ejs');
// assuming you put views folder in the same directory as app.js
app.set('views', __dirname + '/views')

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  

//  app.use(expressLayouts);
// app.set('view engine ', 'ejs');

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log("server started on port ${PORT}"));