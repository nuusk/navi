const fs = require('fs');
const { Wit, log, interactive } = require('node-wit');
const _witAccessToken = fs.readFileSync(__dirname + '/../../resources/keys/wit-access-token.txt', 'utf8').split('\n')[0];

//db requirements
const mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');
const Entity = require('../models/entity');
const Database = require('../db');
const db = new Database();

//express, router, api requirements
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const client = new Wit({
  accessToken: _witAccessToken,
  logger: new log.Logger(log.DEBUG)
});


router.get('/message', function (req, res) {
  //console.log(req.query.name);
  // res.header('Access-Control-Allow-Origin', "*");
  getJSON(req.query.name, res);
});

function getJSON(keyword, response) {
  client.message(keyword, {})
    .then((data) => {
      db.findEntityByType(data.entities.smalltalk[0].value)
        .then((res) => {
          console.log(res);
          response.status(200).send(JSON.stringify(res));
        })
        .catch(console.error);;
    })
    .catch(console.error);
}

module.exports = router;
