// app.js
var express = require('express');
var app = express();

var CommunicationController = require('./controllers/CommunicationController');
var UserController = require('./controllers/UserController');

//cors middleware
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use('/api', CommunicationController);
app.use('/api/users', UserController);

module.exports = app;
