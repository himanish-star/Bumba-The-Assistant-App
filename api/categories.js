const route = require('express').Router();
const category = require('../mongo/models.js').models.category;
const URLS =require('../mongo/models').models.URLS;

route.get('/',(req,res)=>{
    let totalData={};
    category.showAll({})
        .then((data)=>{
        totalData.categoryData=data;
        URLS.find({})
            .then((data)=>{
                totalData.urlData=data;
                res.send(totalData);
            })
            .catch((err)=>console.log(err));
    })
        .catch((err)=>console.log(err));
});

route.post('/',(req,res)=>{
    category.createNew({
        categoryName : req.body.categoryName
    })
        .then((result)=>res.redirect('.'))
        .catch((err)=>console.log(err));

});

route.post('/urls',(req,res)=>{
    URLS.insertOne({
        categoryName:req.body.categoryName,
        urlName:req.body.urlName
    })
        .catch((err)=>console.log(err));
});

exports.route = route;