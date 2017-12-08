

let router = require('express').Router();
let path = require('path');

router.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'/../frontend_works/HTMLfiles/mailPage.html'));
});

function mailFetcher(accessToken,callback) {
    let Gmail = require('node-gmail-api');
    let gmail = new Gmail(accessToken);
    let s = gmail.messages('label:inbox', {max: 50}, { fields: ['id', `labelIds=['READ']`]});
    let i = 0;
    let emails=[];
    s.on('data', function (data) {
        i++;
        emails.push(data.labelIds);
        emails.push(data.snippet);
        if(i===50)
            callback(emails);
    });
}

router.get('/mails',(req,res,next)=>{
    mailFetcher(req.user.accessToken,(emails)=>{
        res.send(emails);
    });
});


module.exports.route=router;
