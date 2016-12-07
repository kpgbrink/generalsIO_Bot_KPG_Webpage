'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const ObjectId = require('mongodb').ObjectId;
const app = express();

const APP_PATH = path.join(__dirname, 'dist');

var collections;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/posts', function(req, res) {
    getPostCollection(res);
});

app.post('/api/posts', function(req, res) {
    var newPost = {
        date: new Date(),
        author: req.body.author,
        author: req.body.author,
        text: req.body.text,
    };
    collections.post.insertOne(newPost, function(err, result) {
        if (err) throw err;
        getPostCollection(res);
    });
});

app.get('/api/posts/:id', function(req, res) {
    collections.post.find({"_id":  ObjectId(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.put('/api/posts/:id', function(req, res) {
    var updateId = ObjectId(req.params.id);
    var update = req.body;
    collections.post.updateOne(
        { _id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            getPostCollection(res);
        });
});

app.delete('/api/posts/:id', function(req, res) {
    collections.post.deleteOne(
        {'_id': ObjectId(req.params.id)},
        function(err, result) {
            if (err) throw err;
            getPostCollection(res);
        });
});

// Send all routes/methods not specified above to the app root.
app.use('*', express.static(APP_PATH));

db.collections.then((myCollections) => {
    collections = myCollections;
    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
});


var getPostCollection = function (res) {
    collections.post.find({}, {sort: { date : -1 }}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
}


