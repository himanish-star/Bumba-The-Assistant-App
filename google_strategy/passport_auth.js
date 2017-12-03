const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../JSONfiles/keys.json');
const User = require('../mongo/models').models.User;

passport.serializeUser(function(user, done) {
    console.log('serializing user format : \n',user);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    console.log("deserializing user id : "+id);
    User.findByKd(id, function(err, user) {
        console.log(user);
        done(err, user);
    });
});

passport.use( new googleStrategy({
    clientID : keys.clientID,
    clientSecret : keys.clientSecret,
    callbackURL : '/auth/google/redirect'
},(accessToken, refreshToken, profile, done) => {

    console.log('Starting gMail Api');
    let Gmail = require('node-gmail-api');
    let gmail = new Gmail(accessToken);
    let s = gmail.messages('label:inbox', {max: 50}, { fields: ['id', 'labelIds:[READ]']});
    let i = 0;
    s.on('data', function (data) {
        i++;
        console.log (i + '  :  ' +data.snippet);
    });

    console.log('End gMail api');
    User.findByGoogleId({googleId: profile.id}).then((currentUser) => {
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