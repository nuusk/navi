// server.js
var app = require('./app');
var server = require('../resources/serverAddress.json')
var port = process.env.PORT || ;
var server = app.listen(server.port, () => {
  console.log('Express server listening on port ' + server.port);
});
