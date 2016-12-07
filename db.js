'user strict';

var MongoClient = require('mongodb').MongoClient


// process.env.MONGO_PASSWORD
// This assumes that the MongoDB password has been set as an environment variable.
var mongoURL = 'mongodb://cs336:'+'bjarne'+'@ds119738.mlab.com:19738/media_react';
var dbPromise = MongoClient.connect(mongoURL);

// http://stackoverflow.com/a/22519785/2948122
module.exports.postCollection = dbPromise.then((db) => {
    return new Promise((resolve,reject) => {
         db.collection('post', (err, data) => {
            if(err !== null) return reject(err);
            resolve(data);
         });
    });
}).then((postCollection) => {
    return postCollection.createIndex('date').then(() => postCollection);
});
    
module.exports.userCollection = dbPromise.then((db) => {
    return new Promise((resolve,reject) =>{
         db.collection('user', (err, data) => {
            if(err !== null) return reject(err);
            resolve(data);
         });
    });
}).then((userCollection) => {
    return userCollection.createIndex('email', {unique: true}).then(() => userCollection);
});

