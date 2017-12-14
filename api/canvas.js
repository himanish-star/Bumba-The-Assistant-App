const route = require('express').Router();
const canvas =require('../mongo/models').models.canvas;

route.get('/',(req,res)=>{
   canvas.findAll({
       userID:req.user._id})
       .then((data)=>{
       console.log(data);
       res.send(data)})
       .catch((err)=>console.log(err));
});

route.post('/insert',(req,res)=>{
    canvas.insertOne({
        userID:req.user._id,
        canvasURL:req.body.canvasURL
    })
        .then((data)=>{res.send('hey123')})
        .catch((err)=>console.log(err));
});

route.post('/delete',(req,res)=>{
    canvas.deleter({
        userID:req.user._id,
        canvasURL:req.body.canvasURL
    })
        .then((data)=>{res.send('hey')})
        .catch((err)=>console.log(err));
});

exports.route = route;
