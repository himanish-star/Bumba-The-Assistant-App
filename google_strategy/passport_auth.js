//my utility function to setup the configuration to use PassPortJS
//this file has to be executed by requiring in the server.js
//before we can use passport.authenticate
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys.json');
const User = require('../mongo/models').models.User;

//things being sent as a cookie
passport.serializeUser(function(user, done) {
    done(null, user);//only user.id will be stored in the cookieSession
    /*why doesn't done(null,user.id) work*/
});

//things being retrieved from a cookie and being restored to req.user() by searching from the database
passport.deserializeUser(function(id, done) {
    console.log("deserializing");
    User.findByKd(id, function(err, user) {
        done(err, user);
    });
    console.log("found");
});

passport.use( new googleStrategy({
    clientID : keys.clientID,
    clientSecret : keys.clientSecret,
    callbackURL : '/auth/google/redirect'
},(accessToken, refreshToken, profile, done) => {
    User.findByGoogleId({googleId: profile.id}).then((currentUser) => {
        // console.log(profile);
        if(currentUser){
            done(null, currentUser);
        } else {
            User.createNewUser({
                googleId:profile.id,
                username:profile.displayName
            })
                .then((newUser)=>{
                    done(null,newUser);
                })
        }
    });
}));


