const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const serverAddress = require('../resources/serverAddress.json');
const app = express();

//add headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
  res.send('go to /api/query');
});

app.post('/api/query', (req, res) => {
  console.log(req);
})

app.listen(serverAddress.port, () => {
  console.log('Server started running on port ' + serverAddress.port + '...');
});
