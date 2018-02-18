// LoginController.js
// import bibliotek 
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
// utworzenie instancji routera, który korzysta z modułu biblioteki express
const router = express.Router();

// import pliku do operacji bazodanowych i utworzenie instancji bazy danych 
const Database = require('../db');
const db = new Database();

// router config - konfiguracja trasowania i kodowania JSONa
router.use(session({ secret: 'ssshhhhh' }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// deklaracja sesji
let sess = {};

//metoda post do logowania, korzysta z bcrypta do odkodowania hasła
router.post('/login', async function (req, res) {
  let user = await db.findUserByEmail(req.body.email);
  console.log("user: " + user);
  if (bcrypt.compareSync(req.body.password, user.password)) {
    req.session.userId = user.id
    req.session.userName = user.name
    sess = req.session;
    console.log(sess);
    res.status(200).send(JSON.stringify(sess));
  } else {
    console.log("Nieprawidłowy email albo hasło.");
    res.end("Nieprawidłowy email albo hasło.");
  }
});

// metoda get do wylogowania
router.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(400).send(JSON.stringify(err));
    } else {
      console.log('logout successful')
      res.end('logout successful');
    }
  });
});

//getter sesji
function getSession() {
  return sess;
}
// eksport routera, i funkcji getSession
module.exports = {
  router,
  getSession
}

