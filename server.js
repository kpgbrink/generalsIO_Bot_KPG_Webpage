'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const session = require('express-session');
const url = require('url');
const request = require('request');

const APP_PATH = path.join(__dirname, 'dist');

var collections;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Check authorization to do certain functions
const authorizedTo = function (role) {
    return function (req, res, next) {
        let userPromise = Promise.resolve(null);
        if (req.session.mediaReactUserId) {
            userPromise = collections.user.findOne({_id: ObjectId(req.session.mediaReactUserId)}).then((user) => {
                console.log(user)
                if (!user) {
                    req.session.mediaReactUserId = null;
                }
                return user;
            });
        }
        userPromise.then((user) => {
            if (user) {
                next();
            } else {
                res.status(403).end();
            }
        }).catch(next);
    };
};


// Login
app.post('/api/login', function(req, res) {
    const googleTemplate = url.parse('https://www.googleapis.com/oauth2/v3/tokeninfo', true);
    googleTemplate.query.id_token = req.body.id_token;
    request({url:url.format(googleTemplate), json:true}, (error, response, body) => {
        if (!error && response.statusCode == 200 && body.email_verified) {
            const findOrCreateUserByEmail = function () {
                return collections.user.findOne({email: body.email}).then((user) => {
                    if  (user) {
                        return user;
                    } else {
                        return collections.user.insertOne({
                            email: body.email,
                        }).then(() => {
                            return findOrCreateUserByEmail();
                        });
                    }
                });
            }
            findOrCreateUserByEmail().then((user) => {
                //console.log(`${body.email}: found userId=${user._id}`);
                req.session.mediaReactUserId = String(user._id);
                res.json({});
                
                // TODO: update profile pic
                collections.user.update({_id: user._id}, {$set: {avatarUrl: body.picture}});
            }).catch((ex) => {
                console.error(ex);
                res.status(500).end();
            });
        } else {
            res.status(500).end();
        }
    });
});

app.get('/api/posts', function(req, res) {
    getPostCollection(res);
});

app.post('/api/posts', authorizedTo(), function(req, res) {
    // Check if logged in
    if (!req.session.mediaReactUserId) {
        return res.status(403).json({});
    }
    var newPost = {
        date: new Date(),
        title: req.body.title,
        text: req.body.text,
        userId: ObjectId(req.session.mediaReactUserId),
    };
    collections.post.insertOne(newPost, function(err, result) {
        if (err) throw err;
        getPostCollection(res);
    });
});

app.get('/api/posts/:id', function(req, res) {
    collections.post.find({_id:  ObjectId(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.put('/api/posts/:id', authorizedTo(), function(req, res, next) {
    var updateId = ObjectId(req.params.id);
    var update = req.body;
    collections.post.updateOne(
        { _id: updateId, userId: ObjectId(req.session.mediaReactUserId) },
        { $set: update }).then((result) => {
            return getPostCollection(res);
        }).catch(next);
});

app.delete('/api/posts/:id', authorizedTo(), function(req, res, next) {
    collections.post.deleteOne(
        {'_id': ObjectId(req.params.id), userId: ObjectId(req.session.mediaReactUserId)}).then((result) => {
            if (result.deletedCount == 0) {
                res.status(403).end();
                return;
            }
            return getPostCollection(res);
        }).catch(next);
});

app.get('/api/postUser/:id', function(req, res, next) {
    
});

// Send all routes/methods not specified above to the app root.
app.use('*', express.static(APP_PATH));

db.then((dbThings) => {
    collections = dbThings.collections;
    console.log("DB resolved");
    const outerApp = express();
    
    // Sessions
    outerApp.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: dbThings.sessionStore
    }));
    
    outerApp.use(app);
    
    outerApp.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
});


var getPostCollection = function (res) {
    collections.post.find({}, {sort: { date : -1 }}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
}



