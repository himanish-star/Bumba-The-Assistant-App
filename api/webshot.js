
const router = require('express').Router();
let webshot = require('webshot');

router.get('/',(req,res)=>{
    let modifiedUrl = req.query.url;
    //for https://
    let k = modifiedUrl.split('https://')[0];
    if (k==='')
        modifiedUrl=modifiedUrl.split('https://')[1];
    //for http://
    k = modifiedUrl.split('http://')[0];
    if (k==='')
        modifiedUrl=modifiedUrl.split('http://')[1];
    // for www. (will also cover https://www. or http://www.
    k = modifiedUrl.split('www.')[0];
    if (k==='')
        modifiedUrl=modifiedUrl.split('www.')[1];
    webshot(`${modifiedUrl}`, `./frontend_works/screenShot/${modifiedUrl.split('/').join('')}.png`, function(err) {
        if (err) throw err;
        console.log("sreenshot taken");
        res.send(`${modifiedUrl.split('/').join('')}.png`);
    });
});

module.exports.route=router;
