//my MongoDB model page
const MongoClient = require('mongodb').MongoClient;
const DataBase = require('../config.json').DB;

let users,categories,urls,todos = null;//the collections used inside the DATABASE

MongoClient.connect(DataBase.URI, function (err,db) {
    if(err) throw err;
    console.log("connected");
    categories = db.collection('categories');
    urls = db.collection('urls');
    todos=db.collection('todos');
    users=db.collection('users');
});

//utility object for Categories
const category = {

    createNew: function(category){
        return new Promise(function(res,rej){
            categories.insertOne(category,function (err,result) {
                if(err) return rej(err);
                return res(result)
            })
        })
    },

    showAll: function (whereArgs) {
        return new Promise(function(res,rej){
            categories.find(whereArgs).toArray(function (err,result) {

                if(err) return rej(err);
                res(result)
            })
        })
    }
};

//utility object for URLs
const URLS={

    insertOne: function (urlObject) {
        return new Promise((resolve,reject)=>{
            urls.insertOne(urlObject,(err,result)=>{
                if(err) throw reject(err);
                return resolve(result);
            })
        })
    },

    find:function (whereArgs) {
        return new Promise(function(res,rej){
            urls.find(whereArgs).toArray(function (err,result) {

                if(err) return rej(err);

                return res(result)
            })
        })
    }
};

//utility object for TODOs
const todo={

    insertOne: function (todoObject) {
        return new Promise((resolve,reject)=>{
            todos.insertOne(todoObject,(err,result)=>{
                if (err) throw reject(err);
                console.log(result);
                resolve(result);
            })
        })
    },

    findAll: function (whereArgs) {
        return new Promise((resolve,reject)=>{
            todos.find(whereArgs).toArray((err,result)=>{
                if(err) reject(err);
                console.log(result);
                resolve(result);
            });
        })
    }
};

//utility object for Users
const User={

    findByKd:(id,callback)=>{
        users.findOne({_id:id},(err,user)=>{
            if(err) callback(err,user);
            console.log("successfully deserialized");
            callback(err,user);
        })
    },

    findByGoogleId:function (whereArgs) {
        return new Promise((resolve,reject)=>{
            users.findOne(whereArgs,(err,result)=>{
                if(err) reject(err);
                console.log("findByGoogleID result\n",result);
                resolve(result);
            });
        })
    },

    createNewUser:(Obj)=>{
        return new Promise((resolve,reject)=>{
            users.insertOne(Obj,(err,user)=>{
                if(err) reject(err);
                user={
                    googleId: user.ops[0].googleId,
                    username: user.ops[0].username,
                    _id: user.ops[0]._id,
                };
                console.log("created new user :\n",user);
                resolve(user);
            })
        })
    }
};

exports.models={category,URLS,todo,User};

