const route = require('express').Router();
const category = require('../mongo/models.js').models.category;

route.get('/',(req,res)=>{
    console.log("inside get call of MONGODB");
    category.showAll({})
        .then((data)=>res.send(data))
        .catch((err)=>console.log(err))
});

route.post('/',(req,res)=>{
    console.log("inserting into database");
    category.createNew({
        categoryName : req.body.categoryName
    })
        .then((result)=>res.redirect('.'))
        .catch((err)=>console.log(err))

});

exports.route = route;