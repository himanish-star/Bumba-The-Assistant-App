const route = require('express').Router();
let lineHistory = require('../server').line_history;
const canvas =require('../mongo/models').models.canvas;

route.get('/',(req,res)=>{
   canvas.findAll({})
       .then((data)=>{
           // console.log(data);
           res.send(data)})
       .catch((err)=>console.log(err));
});

route.post('/',(req,res)=>{
    canvas.insertOne({
        lines:lineHistory,
        canvasName:req.body.canName
    })
        .then(
            require('../server').lineHistory=[],
            // console.log('made original linehistory to be null again B)'),
            (err)=>console.log(err));
});

exports.route = route;
