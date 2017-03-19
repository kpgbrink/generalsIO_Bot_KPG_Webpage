'use strict';

const path = require('path');
const express = require('express');
const expressAutoserve = require('express-autoserve');
const bodyParser = require('body-parser');
const app = express();
const url = require('url');
const request = require('request');
const _ = require('lodash');

const APP_PATH = path.join(__dirname, 'dist');

var collections;

app.use('/', express.static(APP_PATH));
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

expressAutoserve(app);
