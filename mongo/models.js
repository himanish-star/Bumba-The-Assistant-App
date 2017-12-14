const MongoClient = require('mongodb').MongoClient;
const DataBase = require('../JSONfiles/config.json').DB;
// const dbName = require('../google_strategy/passport_auth').hey.userId;
let ObjectId = require('mongodb').ObjectId;

let users,categories,urls,todos, typeOfCanvas = null;
MongoClient.connect(DataBase.mlabURI, function (err,db) {
    if(err) throw err;
    console.log("connected");
    categories = db.collection('categories');
    urls = db.collection('urls');
    todos=db.collection('todos');
    users=db.collection('users');
    typeOfCanvas=db.collection('canvas')
});

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
    },

    deleteOne: function (whereArgs) {
        return new Promise(function (res,rej) {
            categories.remove(whereArgs,function(err,result){
                if(err) return rej(err);
                else
                    return res(result)
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
    },

    find:function (whereArgs) {
        return new Promise(function(res,rej){
            urls.find(whereArgs).toArray(function (err,result) {

                if(err) return rej(err);

                return res(result)
            })
        })
    },

    deleteOne: function (whereArgs) {
        return new Promise(function (res,rej) {
            urls.deleteOne(whereArgs,function(err,result){
                if(err)
                    rej(err);
                else
                    res(result)
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
    },

    deleteOne: function (whereArgs) {
        return new Promise(function (res,rej) {
            todos.deleteOne(whereArgs,function(err,result){
                if(err) rej(err);
                res(result)
            })

        })

    }
};

const User={

    findByKd:(id,callback)=>{
        users.findOne(ObjectId(id),(err,user)=>{
            if(err) callback(err,user);
            callback(err,user);
        })
    },

    findByGoogleId:function (whereArgs,accessToken) {
        return new Promise((resolve,reject)=>{
            users.findOneAndUpdate(whereArgs,{$set:{ accessToken : accessToken } },(err,result)=>{
                if(err) reject(err);
                resolve(result.value);
            });
        })
    },

    createNewUser:(Obj)=>{
        return new Promise((resolve,reject)=>{
            users.insertOne(Obj,(err,user)=>{
                if(err) reject(err);
                user=user.ops[0];
                resolve(user);
            })
        })
    }
};

const canvas =
    {
        insertOne: function (todoObject) {
            return new Promise((resolve,reject)=>{
                typeOfCanvas.insertOne(todoObject,(err,result)=>{
                    if (err) throw reject(err);
                    resolve(result);
                })
            })
        },

        findAll: function (whereArgs) {
            return new Promise((resolve,reject)=>{
                typeOfCanvas.find(whereArgs).toArray((err,result)=>{
                    if(err) reject(err);
                    resolve(result);
                });
            })
        },

        deleter: function (whereArgs) {
            return new Promise((resolve,reject)=>{
                typeOfCanvas.deleteMany(whereArgs,(err,result)=>{
                    if(err) reject(err);
                    resolve(result);
                })
            })
        }
};

exports.models={category,URLS,todo,User,canvas};
