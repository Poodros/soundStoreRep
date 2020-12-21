const express = require('express')
const router = express.Router()

const Task = require('../models/schemas')

const passport = require('passport')

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login.hbs')
}


//Get songs
router.get('/', isLoggedIn,(req, res, next) => {
    Task.find((err, songs) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.render('index',
                {
                    songs: songs,
                    user: req.user
                })
        }
    })
})
//GET songs add view
router.get('/upload.hbs', isLoggedIn,(req, res, next) => {
    res.render('upload.hbs', {
        user: req.user
        })
})

router.post('/upload.hbs', isLoggedIn,(req, res, next) =>
{
    Task.create({
        s_name:req.body.s_name,
        a_name: req.body.a_name,
        artist:req.body.artist,
        year:req.body.year
    }, (err, task) => {
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.redirect('/')
        }
    })
})

router.get('/delete/:_id', isLoggedIn,(req, res, next) => {
    var _id = req.params._id;
    Task.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('index.hbs')
        }
    })
})

router.get('/edit/:_id', isLoggedIn,(req, res, next) => {
    var _id = req.params._id
    Task.findById(_id,(err,task) => {
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.render('index',
                { task: task,
                user: req.user})
        }
    })
})

router.post('/edit/:_id', isLoggedIn,(req, res, next) =>
{
    var _id = req.params._id
    let complete = false
    if(req.body.complete === "on")
    {
        complete = true
    }

    console.log('Complete value: ' + req.body.complete)
    var task = new Task({
        _id: _id,
        name: req.body.name,
        priority: req.body.priority,
        complete: complete
    })
    Task.update({_id: _id}, task, (err) => {
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.redirect('/songs')
        }
    })
})
module.exports = router