const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys.json');

passport.use( new googleStrategy({
    clientID : keys.clientID,
    clientSecret : keys.clientSecret,
    callbackURL : 'auth/google/redirect'
},() => {}));