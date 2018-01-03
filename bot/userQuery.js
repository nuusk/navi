const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const serverAddress = require('../resources/serverAddress.json');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//add headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('go to /api/query');
});

app.post('/api/query', (req, res) => {
  console.log(`User asked: "${req.body.query}".`);
})

app.listen(serverAddress.port, () => {
  console.log('Server started running on port ' + serverAddress.port + '...');
});
