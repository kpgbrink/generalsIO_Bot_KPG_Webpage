'use strict';

var MongoClient = require('mongodb').MongoClient


// process.env.MONGO_PASSWORD
// This assumes that the MongoDB password has been set as an environment variable.
var mongoURL = 'mongodb://cs336:'+process.env.MONGO_PASSWORD+'@ds119738.mlab.com:19738/media_react';

//http://stackoverflow.com/a/39831825/2948122
var dbPromise = MongoClient.connect(mongoURL, 
    { server: { 
        // sets how many times to try reconnecting
        reconnectTries: Number.MAX_VALUE,
        // sets the delay between every retry (milliseconds)
        reconnectInterval: 1000 
        } 
    }
);

// http://stackoverflow.com/a/22519785/2948122
var postCollection = dbPromise.then((db) => {
    return new Promise((resolve,reject) => {
         db.createCollection('post', {
             validator: {
                 userId: { $type: "objectId"},
                 date: { $type: "date"},
             },
         }, (err, data) => {
            if(err !== null) return reject(err);
            resolve(data);
         });
    });
}).then((postCollection) => {
    return postCollection.createIndex('date').then(() => postCollection);
});

// http://stackoverflow.com/a/22519785/2948122
var commentCollection = dbPromise.then((db) => {
    return new Promise((resolve, reject) => {
         db.createCollection('comment', {
             validator: {
                 postId: { $type: "objectId"},
                 date: { $type: "date"},
                 $or: [
                     {parentCommentId: { $type: 'null', }},
                     {parentCommentId: { $type: "objectId"}},
                 ],
             },
         }, (err, data) => {
            if(err !== null) return reject(err);
            resolve(data);
         });
    });
}).then((commentCollection) => {
    return commentCollection.createIndex('date').then(() => commentCollection);
});

//Collection for the Catalog
var catalogConnection = dbPromise.then((db) => {
    return new Promise((resolve,reject) => {
         db.createCollection('catalog', {}, (err, data) => {
            if(err !== null) return reject(err);
            resolve(data);
         });
    });
}).then((catalogConnection) => {
    return catalogConnection.createIndex('date').then(() => catalogConnection);
});


var userCollection = dbPromise.then((db) => {
    return new Promise((resolve,reject) =>{
         db.createCollection('user', {validator: {email: { $type: "string"}}}, (err, data) => {
            if(err !== null) return reject(err);
            resolve(data);
         });
    });
}).then((userCollection) => {
    return userCollection.createIndex('email', {unique: true}).then(() => userCollection);
});

const collections = {};
var db;
module.exports = Promise.all([
        postCollection.then((postCollection) => collections.post = postCollection),
        commentCollection.then((commentCollection) => collections.comment = commentCollection),
        catalogConnection.then((catalogCollection) => collections.catalog = catalogCollection),
        userCollection.then((userCollection) => collections.user = userCollection),
        dbPromise.then((_db) => db = _db),
    ]).then(() => ({
        collections: collections,
        sessionStore: new (require('connect-mongo')(require('express-session')))({db: db}),
}));
