const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../JSONfiles/keys.json');
const User = require('../mongo/models').models.User;

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(

    function(id, done) {
    User.findByKd(id, function(err, user) {
        done(err, user);
    });

});

passport.use( new googleStrategy({
    clientID : keys.clientID,
    clientSecret : keys.clientSecret,
    callbackURL : '/auth/google/redirect'
},(accessToken, refreshToken, profile, done) => {
    User.findByGoogleId({googleId: profile.id},accessToken).then((currentUser) => {
        if(currentUser){
            done(null, currentUser);
        } else {
            User.createNewUser({
                googleId:profile.id,
                username:profile.displayName,
                thumbnail:profile._json.image.url,
                accessToken:accessToken
            })
                .then((newUser)=>{
                    done(null,newUser);
                })
        }
    });
}));
