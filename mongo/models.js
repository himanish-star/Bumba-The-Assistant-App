const MongoClient = require('mongodb').MongoClient;
const DataBase = require('../config.json').DB;

let catego = null;

MongoClient.connect(DataBase.URI, function (err,db) {

    if(err) throw err;

    catego = db.collection('categories');

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

                return res(result)
            })
        })
    }
};
exports.models={category};