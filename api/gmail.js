

let router = require('express').Router();
let path = require('path');

router.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'/../frontend_works/HTMLfiles/mailPage.html'));
});

router.get('/mails',(req,res,next)=>{
    let emails=req.app.locals.emails;
    // let labelIds=req.app.locals.labelIds;
    res.send(emails);
});


module.exports.route=router;