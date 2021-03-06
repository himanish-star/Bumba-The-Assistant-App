const route = require('express').Router();
const category = require('../mongo/models.js').models.category;
const URLS =require('../mongo/models').models.URLS;
const Todos=require('../mongo/models').models.todo;

route.get('/',(req,res)=>{
    let totalData={};
    category.showAll({userID:req.user._id})
        .then((data)=>{
            totalData.categoryData=data;
            URLS.find({userID:req.user._id})
                .then((data)=>{
                    totalData.urlData=data;
                    res.send(totalData);
                })
                .catch((err)=>console.log(err));
        })
        .catch((err)=>console.log(err));
});

route.post ('/',(req,res) => {
    category.createNew({
        userID: req.user._id,
        categoryName: req.body.categoryName
    })
        .then((result) => res.redirect('.'))
        .catch((err) => console.log(err));
});

route.post('/delete',(req,res)=>{
    category.deleteOne({
        userID:req.user._id,
        categoryName : req.body.cName
    })
        .catch((err) => console.log(err));
});

route.post('/todos',(req,res)=>{
    Todos.insertOne({
        userID:req.user._id,
        task:req.body.task,
        done:req.body.done
    })
        .catch((err)=>console.log(err));
});

route.get('/todos',(req,res)=>{
    Todos.findAll({userID:req.user._id})
        .then((data)=>res.send(data))
        .catch((err)=>console.log(err));
});


route.post('/todos/delete',(req,res)=>{
    Todos.deleteOne({
        userID:req.user._id,
        task:req.body.task
    })
        .catch((err)=>console.log(err));
});


route.post('/urls',(req,res)=>{
    URLS.insertOne({
        userID:req.user._id,
        categoryName:req.body.categoryName,
        urlName:req.body.urlName
    })
        .catch((err)=>console.log(err));
});

route.post('/urls/delete',(req,res)=>{
    URLS.deleteOne({
        userID:req.user._id,
        urlName:req.body.urlName
    })
        .then((data)=>{res.send('hey')})
        .catch((err)=>console.log(err));
});

exports.route = route;
