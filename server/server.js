// server.js
var app = require('./app');
var server = require('../resources/serverAddress.json');
var port = process.env.PORT || server.port;
var server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
