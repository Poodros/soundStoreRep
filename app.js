var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var tasksRouter = require('./controllers/tasks');
const passport = require('passport')
const session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//database connection
const mongoose = require('mongoose')
const globals = require('./config/globals')
mongoose.connect(globals.db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(
    (res) => {
      console.log('connection ok')
    }
).catch(() => {
  console.log('you failed lol')
})
//passport thing....lol

//session config
app.use(session({
  secret: 'SoundStoreSecret',
  resave: true,
  saveUninitialized:false
}))

//passport setup
app.use(passport.initialize())
app.use(passport.session())

//connect passport and user model
const User = require('./models/user')
passport.use(User.createStrategy())

//setup passport for read write
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//google login
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
    clientID: globals.ids.google.clientID,
    clientSecret: globals.ids.google.clientSecret,
    callbackURL: globals.ids.google.callbackURL
},
    (token, tokenSecret, profile, done) => {
        User.findOne({oauthId: profile.id}, (err, user)=>{
            if(err)
            {
                console.log(err)
            }
            if (!err && user != null)
            {
                done(null, user)
            }
            else
            {
                user = new User({
                    oauthId: profile.id,
                    username: profile.displayName,
                    oauthProvider: 'Google',
                    created: Date.now()
                })
                user.save((err) => {
                    if(err)
                    {
                        console.log(err)
                    }
                    else
                    {
                        done(null, user)
                    }
                })
            }
        })
    }
))

module.exports = app;
