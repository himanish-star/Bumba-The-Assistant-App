//initializing constants
const express = require('express');
const config = require('./JSONfiles/config.json');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieSession= require('cookie-session');
const passport = require("passport");
const http = require('http');
const socketIo = require('socket.io');


const routes = {
    categories : require('./api/categories').route,
    auth : require('./api/authorization').router,
    profile: require('./api/profile').route,
    mail: require('./api/gmail').route,
    webshot: require('./api/webshot').route,
    // quora: require('./api/quora').route,
    canvas: require('./api/canvas').route
};

//loading of middlewares
app.use(cookieSession({
    secret:"famous",
    maxAge:60*60*1000,
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

//Setting the server
const server =  http.createServer(app);
const io = socketIo.listen(server);

//Storing a canvas configuration
let line_history = [];

//all Socket Functions
io.on('connection', function (socket) {

    // first send the history to the new client
    for (let i in line_history) {
        socket.emit('draw_line', { line: line_history[i] } );
    }

    // add handler for message type "draw_line".
    socket.on('draw_line', function (data) {
        // add received line to history
        line_history.push(data.line);
        // send line to all clients
        io.emit('draw_line', { line: data.line });
    });
});

server.listen(config.SERVER.PORT,
    ()=> {console.log("socket Server started at http://localhost:" +config.SERVER.PORT)});

module.exports=app;
module.exports = {
    line_history
};

require('./google_strategy/passport_auth');//requiring this to run the configuration
