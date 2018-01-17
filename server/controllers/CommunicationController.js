const fs = require('fs');
const { Wit, log, interactive } = require('node-wit');
const _witAccessToken = fs.readFileSync(__dirname + '/../../resources/keys/wit-access-token.txt', 'utf8').split('\n')[0];

//db requirements
const mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');
const Entity = require('../models/entity');
const Database = require('../db');
const db = new Database();
const calculateDistance = require('../calculateDistance');


//express, router, api requirements
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// router config
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const LoginController = require('./LoginController');


const client = new Wit({
  accessToken: _witAccessToken,
  logger: new log.Logger(log.DEBUG)
});

let session = {};
let user = {};

router.get('/message', async function (req, res) {
  // cors filter
  // res.header('Access-Control-Allow-Origin', "*");
  console.log(req.query);
  session = LoginController.getSession();
  user = await db.findUserById(session.userId);
  if(user) {
  }
  //db.findUserByIdAndUpdate()
  getJSON(req.query.name, req.query.lat, req.query.lng, res);
});

// metoda do zwracania JSONa encji lub miejsca na podstawie keyworda i wysyla na front res
function getJSON(keyword, lat, lng, response) {
  client.message(keyword, {})
    .then((data) => {
      //console.log(data); //log dla odpowiedzi 
      if (data.entities.smalltalk) {
        db.findEntityByType(data.entities.smalltalk[0].value)
          .then((res) => {
            //console.log(res);
            response.status(200).send(JSON.stringify(res));
          })
          .catch(console.error);
      }
      if (data.entities.place) {
        db.findPlaces(data.entities.place[0].value)
          .then((res) => {
            console.log(lat);
            console.log(lng);
            res.forEach(x => {
              console.log(calculateDistance(lat, lng, x.location.lat, x.location.lng));
            });
            //console.log(res);
            // res to sa wszystkie miejsca ktore maja taki typ jak keyword
            // to do preferenceModel()
            //console.log(session);
            response.status(200).send(JSON.stringify(res[0]));
          })
          .catch(console.error);
      }
    })
    .catch(console.error);
}

module.exports = router;
