const {interactive} = require('node-wit');

const client = new Wit({
  accessToken: _witAccessToken,
  logger: new log.Logger(log.DEBUG)
});

interactive(client);
