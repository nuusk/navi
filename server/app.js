// app.js
const express = require('express');
const app = express();

// import kontrolerów
const CommunicationController = require('./controllers/CommunicationController');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

// cors middleware, skrypt pośredniczący, który umożliwia komunikację pomiędzy serwerami o różnych adresach ip
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// deklaracja używania middleware i kontrolerów przez główny plik aplikacji
app.use(allowCrossDomain);
app.use('/api', CommunicationController);
app.use('/api/users', UserController);
app.use('/api', LoginController.router);

// eksport centralnego pliku aplikacji
module.exports = app;
