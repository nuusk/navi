// server.js
// import aplikacji
const app = require('./app');
// import konfiguracji serwera
<<<<<<< HEAD
const server = require(__dirname + '/../resources/serverAddress.json');
// deklaracja portu
const port = process.env.PORT || server.port;
=======
const serverAddress = require(__dirname + '/../resources/serverAddress.json');
// deklaracja portu
const port = process.env.PORT || serverAddress.port;
>>>>>>> 431c9ec2aa85a32c46c9cb329a4d3ab3e9f1f041
// utworzenie instancji serwera i nasłuch aplikacji na zdeklarowanym powyżej porcie
const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
