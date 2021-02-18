const express=require("express");
const router =express.Router();
const bcrypt= require('bcrypt')
const passport = require('passport');

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended:false}));

// user model

const User = require('../models/User')
router.get('/login', (req,res)=> res.render("login"));


router.get('/register', (req,res)=> res.render("register"));


router.post('/register' , (req,res)=> {
    const {name , email , password , password2 }= req.body ;
    let errors =[]; 
    if (!name || !email || !password || !password2){
        errors.push( {msg : "pleae fill "})
    }

    if (password !== password2){
        errors.push({msg : "password not matched"})

    }
    if (password.length < 6){
        errors.push({msg : "lenthg of password"})
    }
    if (errors.length > 0){
        res.render('register' , {
            errors ,
            name,
            email,
            password,
            password2
        })
    }
    else {
    //    validation
    User.findOne({email: email})
    .then ( user => {
        if (user){
            // user exist 
            errors.push({msg :"alreafdy exist"})
            res.render('register' , {
                errors ,
                name,
                email,
                password,
                password2
            });
           
            

        }else {
            const newUser = new User ({
                name ,
                email,
                password
            })
             // hash password
             bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => {
                      req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                      res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                });
              });
            }
          });
        }
      });
            
    // console.log(req.body)
    // res.send("hello")router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })
//   (req, res, next);
router.post('/login' , (req,res) =>{
    res.render("/dashboard")
}


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
    

module.exports =router;
