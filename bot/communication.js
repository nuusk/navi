const fs = require('fs');
const { Wit, log, interactive } = require('node-wit');
const _witAccessToken = fs.readFileSync('../resources/keys/wit-access-token.txt', 'utf8').split('\n')[0];

const mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');
const Entity = require('../server/models/entity');

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
  getJSON(req.query.name, res);
});

function getJSON(keyword, res) {
  client.message(keyword, {})
    .then(data => {
      findEntityByType(data.entities.smalltalk[0].value, res);
      //console.log('~ response: ' + JSON.stringify(data));
      //res.send(JSON.stringify(findEntityByType(data.entities.smalltalk[0].value)));
    })
    .catch(console.error);
}

function findEntityByType(type, response) {
  Entity.findOne({ name: type }, (err, res) => {
    console.log(res);
    response.status(200).send(res);
  });
}

function insertEntity(name, intents) {
  const entity = new Entity({
    name: name,
    intents: intents
  });
  entity.save()
    .then(() => {
      console.log("entity saved");
    })
    .catch((err) => console.log(err));
  console.log(entity);
}

// insertEntity("introduce", 
// [
//   "jestem navi... jestem by pomoc ci odnalezc swoje miejsce",
//   "yo yo tu navi, co chcesz?",
//   "tu navi odbior, czego chcesz?"
// ]);

//findEntityByType("greet");
module.exports = router;
