'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const ObjectId = require('mongodb').ObjectId;
const app = express();

const APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/media', function(req, res) {
    db.postCollection.then((postCollection) => {
        postCollection.find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});

app.post('/api/media', function(req, res) {
    db.postCollection.then((postCollection) => {
        var newComment = {
            date: new Date(),
            author: req.body.author,
            author: req.body.author,
            text: req.body.text,
        };
        postCollection.insertOne(newComment, function(err, result) {
            if (err) throw err;
            postCollection.find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
    });
});

app.get('/api/media/:id', function(req, res) {
    db.postCollection.then((postCollection) => {
        postCollection.find({"_id":  ObjectId(req.params.id)}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});

app.put('/api/media/:id', function(req, res) {
    db.postCollection.then((postCollection) => {
        var updateId = Number(req.params.id);
        var update = req.body;
        postCollection.updateOne(
            { id: updateId },
            { $set: update },
            function(err, result) {
                if (err) throw err;
                postCollection.find({}).toArray(function(err, docs) {
                    if (err) throw err;
                    res.json(docs);
                });
            });
        });
});

app.delete('/api/media/:id', function(req, res) {
    db.postCollection.then((postCollection) => {
        postCollection.deleteOne(
            {'id': Number(req.params.id)},
            function(err, result) {
                if (err) throw err;
                postCollection.find({}).toArray(function(err, docs) {
                    if (err) throw err;
                    res.json(docs);
                });
            });
    });
});

// Send all routes/methods not specified above to the app root.
app.use('*', express.static(APP_PATH));


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});




