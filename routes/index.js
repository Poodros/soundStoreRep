var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SoundStore' });
});
router.get('/upload.hbs', function(req, res, next) {
  res.render('upload', { title: 'SoundStore' });
});
router.get('/login.hbs', function(req, res, next) {
  res.render('login', { title: 'SoundStore' });
});
router.get('/register.hbs', function(req, res, next) {
  res.render('register', { title: 'SoundStore' });
});

module.exports = router;
