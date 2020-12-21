var express = require('express');
var router = express.Router();

const passport = require('passport')
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SoundStore' });
});
router.get('/upload.hbs', function(req, res, next) {
  res.render('upload', { title: 'SoundStore' });
});
router.get('/about.hbs', function(req, res, next) {
  res.render('about', { title: 'SoundStore' });
});
router.get('/contact.hbs', function(req, res, next) {
  res.render('contact', { title: 'SoundStore' });
});
/* Get Login and Register */
router.get('/register.hbs',(req, res, next) => {
  res.render('register',{ title: 'SoundStore' })
})

//POST /Register
router.post('/register.hbs', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, user) => {
    if(err){
      console.log(err)
      res.end(err)
    }
    else
    {
      req.login(user, (err) =>{
        res.redirect('/')
      })
    }
  })
})


//Get/login
router.get('/login.hbs',(req, res, next) => {
  //Check for Invalid Login message and pass to the view to display
  let messages = req.session.messages || []
  //Clear the Session Message
  req.session.messages = []
    res.render('login', {
      messages: messages,
      title: 'SoundStore'})
  })

//POST /Login
router.post('/login.hbs', passport.authenticate('local', {
  successRedirect: '/tasks',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}))

//GET /Logout
router.get('/logout', (req, res, next) => {
  //Call passport built-in logout method
  req.logout()
  res.redirect('/login.hbs')
})
// GET / Google /
// Check if the User is already logged into/with Google, if not invoke then Google Signin
router.get('/google', passport.authenticate('google', {
  scope:['profile']
}),
    (req, res) => {})

//Get / google/callback
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login.hbs'
}),
    (req,res) =>{
  res.redirect('/')
    })
module.exports = router;
