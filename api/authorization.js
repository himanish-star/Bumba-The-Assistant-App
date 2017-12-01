const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.sendFile('/home/soumya/BUMBA/test.html');
});

router.get('/google',
    passport.authenticate('google',{scope:['profile']}),
    (req,res)=>{
        console.log("hey I'm here");
    });

router.get('/google/redirect',
    passport.authenticate('google'),
    (req,res)=>{
        res.redirect('/');
    });

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports.router= router;