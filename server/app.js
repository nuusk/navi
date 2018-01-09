// app.js
var express = require('express');
var app = express();

var CommunicationController = require('../bot/communication');
app.use('/api', CommunicationController);

module.exports = app;