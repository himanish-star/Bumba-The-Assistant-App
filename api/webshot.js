
const router = require('express').Router();
let webshot = require('webshot');

router.get('/',(req,res)=>{
    webshot(`${req.query.url}`, `./frontend_works/screenShot/${req.query.url}.png`, function(err) {
        if (err) throw err;
        console.log("sreenshot taken");
        res.send(`${req.query.url}.png`);
    });
});

module.exports.route=router;