
const router = require('express').Router();
let webshot = require('webshot');
let specificData;

router.get('/',(req,res,next)=>{
    specificData="";
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

    let renderStream = webshot(`${modifiedUrl}`);
    renderStream.on('data', function(data) {
        specificData += data.toString('base64');
    });

    renderStream.on('end', function() {
        next();
    });
},(req,res)=>{
    res.send(specificData);
});


module.exports.route=router;
