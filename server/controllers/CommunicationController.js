// import biblotek zewnętrznego api wit.ai i bibloteki fs do skanowania plików projektu
// użycie fs do importu ustawień i kluczy wymaganych do komunikacji z zewnętrznym API
const fs = require('fs');
const { Wit, log, interactive } = require('node-wit');
const _witAccessToken = fs.readFileSync(__dirname + '/../../resources/keys/wit-access-token.txt', 'utf8').split('\n')[0];

// db requirements - bibloteki i komunikacja z baza danych
const mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');
const Entity = require('../models/entity');
const Database = require('../db');
const db = new Database();

// import metody to kalkulacji dystansu między geolokalizacją użytkownika a miejscami
// zwroconymi przez google places api
const calculateDistance = require('../calculateDistance');

// express, router, api requirements - import bibliotek express, deklaracja routera
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// router config - konfiguracja routera
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// import LoginControllera 
const LoginController = require('./LoginController');

// deklaracja instancji wit.ai
const client = new Wit({
  accessToken: _witAccessToken,
  logger: new log.Logger(log.DEBUG)
});

// deklaracja sesji i użytkownika
let session = {};
let user = {};


// nieskonczone!!! metoda która na podstawie zapytania przeglądarki wywoluje metodę
// getJSON
router.get('/message', async function (req, res) {
  console.log(req.query.name);
  session = LoginController.getSession();
  user = await db.findUserById(session.userId);
  //console.log(user);
  // jeśli user jest zalogowany to przechodzi przez model preferencyjny
  if(user) {

  }
  //db.findUserByIdAndUpdate()
  getJSON(req.query.name, req.query.lat, req.query.lng, res);
});

// metoda do zwracania JSONa encji lub miejsca na podstawie keyworda i wysyla
// odpowiedź do przeglądarki
function getJSON(keyword, lat, lng, response) {
  let array = [];
  let tempDistance;
  let tempResult;
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
            //console.log(lat);
            //console.log(lng);
            res.forEach(x => {
              x.tempDistance = calculateDistance(lat, lng, x.location.lat, x.location.lng);
              if(!array.includes(x.tempDistance)) {
                array.push(x);
              }
            });
            array.sort((a, b) => b.tempDistance - a.tempDistance);
            tempResult = array.pop();
            //console.log('array ', array);
            console.log(tempResult.tempDistance);

            //console.log(array);

            //console.log(res);
            // res to sa wszystkie miejsca ktore maja taki typ jak keyword
            // to do preferenceModel()
            //console.log(session);
            response.status(200).send(JSON.stringify(res[0]));
          })
          .catch(console.error);
      }
      if (data.entities.another) {
        db.findEntityByType(data.entities.another[0].value)
          .then((res) => {
            //console.log(res);
            response.status(200).send(JSON.stringify(res));
          })
          .catch(console.error);
      }
    })
    .catch(console.error);
}

// eksport routera
module.exports = router;
