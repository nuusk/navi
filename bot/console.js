const fs = require('fs');
const {Wit, log} = require('node-wit');
const _witAccessToken = fs.readFileSync('../keys/wit-access-token.txt', 'utf8').split('\n')[0];

const client = new Wit({
  accessToken: _witAccessToken,
  logger: new log.Logger(log.DEBUG)
});

console.log(client.message('jak masz na imię?'));
