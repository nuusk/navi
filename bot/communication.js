const fs = require('fs');
const { Wit, log, interactive } = require('node-wit');
const _witAccessToken = fs.readFileSync('../resources/keys/wit-access-token.txt', 'utf8').split('\n')[0];

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const client = new Wit({
  accessToken: _witAccessToken,
  logger: new log.Logger(log.DEBUG)
});

router.get('/message', function (req, res) {
  console.log(req.query.name);
  getJSON(req.query.name, res);
});

function getJSON(keyword, res) {
  client.message(keyword, {})
    .then(data => {
      console.log('~ response: ' + JSON.stringify(data));
      res.send(JSON.stringify(data));
    })
    .catch(console.error);
}


module.exports = router;
