//initializing constants
const express = require('express');
const config = require('./config.json');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieSession= require('cookie-session');
const passport = require("passport");
const routes = {
    categories : require('./api/categories').route,
    auth : require('./api/authorization').router,
};
require('./google_strategy/passport_auth');//requiring this to run the configuration

//loading of middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
    maxAge:3*1000,
    keys:config.cookieKey
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/categories',routes.categories);
app.use('/auth',routes.auth);
app.use('/',express.static(path.join(__dirname,'frontend_works')));

app.listen(config.SERVER.PORT,
    ()=> {console.log("Server started at http://localhost:" +config.SERVER.PORT)});