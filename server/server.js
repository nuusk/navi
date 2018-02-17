// server.js
// import aplikacji
const app = require('./app');
// import konfiguracji serwera
const serverAddress = require(__dirname + '/../resources/serverAddress.json');
// deklaracja portu
const port = process.env.PORT || serverAddress.port;
// utworzenie instancji serwera i nasłuch aplikacji na zdeklarowanym powyżej porcie
const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
