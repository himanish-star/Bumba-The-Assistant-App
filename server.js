//initializing constants
const express = require('express');
const config = require('./JSONfiles/config.json');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieSession= require('cookie-session');
const passport = require("passport");
const routes = {
    categories : require('./api/categories').route,
    auth : require('./api/authorization').router,
    profile: require('./api/profile').route,
    mail: require('./api/gmail').route,
    webshot: require('./api/webshot').route,
    // quora: require('./api/quora').route,
    canvas: require('./api/canvas').route
};

app.use(cookieSession({
    secret:"famous",
    maxAge:24*60*60*1000,
    keys:[config.cookieKey],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',passport.initialize());
app.use('/',passport.session());
app.use('/categories',routes.categories);
app.use('/auth',routes.auth);
app.use('/profile',routes.profile);
app.use('/gmail',routes.mail);
app.use('/webshot',routes.webshot);
// app.use('/quora',routes.quora);
app.use('/canvas',routes.canvas);
app.use('/',express.static(path.join(__dirname,'frontend_works')));

app.get('/',(req,res)=>{
    res.redirect('/HTMLfiles');
});

app.get('/HTMLfiles',(req,res,next)=>{
    res.sendFile(__dirname+'/frontend_works/HTMLfiles/homePage.html');
});

app.listen( process.env.PORT || config.SERVER.PORT ,
    ()=> {console.log("Server started at http://localhost:" +config.SERVER.PORT)});


module.exports = app;
require('./google_strategy/passport_auth');//requiring this to run the configuration

app.use((req,res)=> res.status(404).send('page not found'));
