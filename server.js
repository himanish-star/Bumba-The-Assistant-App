const express = require('express');
const config = require('./config.json');
const bodyParser = require('body-parser');
const path = require('path');

const routes = {
    categories : require('./api/categories.js')
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/categories',routes.categories);

app.use('/',express.static(path.join(__dirname,'frontend_works')));

app.listen(config.SERVER.PORT,
    ()=> {console.log("Server started at localhost:" +config.SERVER.PORT)});