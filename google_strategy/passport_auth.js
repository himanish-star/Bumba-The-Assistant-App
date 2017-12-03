const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../JSONfiles/keys.json');
const User = require('../mongo/models').models.User;

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findByKd(id, function(err, user) {
        done(err, user);
    });
});

passport.use( new googleStrategy({
    clientID : keys.clientID,
    clientSecret : keys.clientSecret,
    callbackURL : '/auth/google/redirect'
},(accessToken, refreshToken, profile, done) => {
    let Gmail = require('node-gmail-api');
    let gmail = new Gmail(accessToken);
    let s = gmail.messages('label:inbox', {max: 50}, { fields: ['id', 'labelIds:[READ]']});
    let i = 0;
    s.on('data', function (data) {
        i++;
    });
    console.log("remianing: to implement the best storage feature for email snippets");
    User.findByGoogleId({googleId: profile.id}).then((currentUser) => {
        if(currentUser){
            done(null, currentUser);
        } else {
            User.createNewUser({
                googleId:profile.id,
                username:profile.displayName,
                thumbnail:profile._json.image.url
            })
                .then((newUser)=>{
                    done(null,newUser);
                })
        }
    });
}));