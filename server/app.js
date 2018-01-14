// app.js
const express = require('express');
const app = express();

const CommunicationController = require('./controllers/CommunicationController');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
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
app.use('/api', LoginController.router);

module.exports = app;
