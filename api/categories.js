const route =require('express').Router();
const category = require('../mongo/models').models.category;

route.get('/',(req,res)=>{

    category.showAll({})
        .then((categories)=>res.send(categories))
        .catch((err)=>console.log(err))
});

route.post('/',(req,res)=>{

    category.createNew({
        categoryName : req.body.categoryName,
        userId : req.body.userId
    })
        .then((result)=>res.redirect('.'))
        .catch((err)=>console.log(err))

});

express.route = route;