const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.redirect('/HTMLfiles/card_exp.html');
});

router.get('/google',
    passport.authenticate('google',{scope:['profile','https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify']}),
    (req,res)=>{

    });

router.get('/google/redirect',
    passport.authenticate('google'),
    (req,res)=>{
        res.redirect('/auth/login/')
    });

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports.router= router;
