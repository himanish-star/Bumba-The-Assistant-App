const MongoClient = require('mongodb').MongoClient;
const DataBase = require('../config.json').DB;

var catego,urls,todos = null;

MongoClient.connect(DataBase.URI, function (err,db) {
    if(err) throw err;
    catego = db.collection('collection');
    urls = db.collection('urls');
    todos=db.collection('todos');
});

const category = {

    createNew: function(category){
        return new Promise(function(res,rej){
            catego.insertOne(category,function (err,result) {
                if(err) return rej(err);
                return res(result)
            })
        })
    },

    showAll: function (whereArgs) {
        return new Promise(function(res,rej){
            catego.find(whereArgs).toArray(function (err,result) {

                if(err) return rej(err);
                res(result)
            })
        })
    }
};


const URLS={
    insertOne: function (urlObject) {
        return new Promise((resolve,reject)=>{
            urls.insertOne(urlObject,(err,result)=>{
                if(err) throw reject(err);
                return resolve(result);
            })
        })
    }
    ,
    find:function (whereArgs) {
        return new Promise(function(res,rej){
            urls.find(whereArgs).toArray(function (err,result) {

                if(err) return rej(err);

                return res(result)
            })
        })
    }
};

const todo={
    insertOne: function (todoObject) {
        return new Promise((resolve,reject)=>{
            todos.insertOne(todoObject,(err,result)=>{
                if (err) throw reject(err);
                resolve(result);
            })
        })
    },
    findAll: function (whereArgs) {
        return new Promise((resolve,reject)=>{
            todos.find(whereArgs).toArray((err,result)=>{
                if(err) reject(err);
                resolve(result);
            });
        })
    }
};

exports.models={category,URLS,todo};

