const express = require('express');
const config = require('./config.json');
const bodyParser = require('body-parser');
const path = require('path');
const passport_auth = require('./google_strategy/passport_auth');

const routes = {
    categories : require('./api/categories').route,
    auth : require('./api/authorization').route
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/categories',routes.categories);

app.use('/auth',routes.auth);

app.use('/',express.static(path.join(__dirname,'frontend_works')));

app.listen(config.SERVER.PORT,
    ()=> {console.log("Server started at http://localhost:" +config.SERVER.PORT)});