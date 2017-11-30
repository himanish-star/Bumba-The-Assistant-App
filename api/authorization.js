const router = require('express').Router();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../google_strategy/keys.json');

router.get('/',(req,res) =>{
    res.render('index');
});

router.get('google/',() => {
    passport.use( new googleStrategy({
        clientID : keys.clientID,
        clientSecret : keys.clientSecret,
        callbackURL : 'auth/google/redirect'
    },() => {}));
});

router.get('/logout',(req,res)=>{
    res.send('you have been logged out');
});

module.exports = router;