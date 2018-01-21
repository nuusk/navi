// LoginController.js
const express = require('express');
const session = require('express-session');
const router = express.Router();
const bodyParser = require('body-parser');
const Database = require('../db');
const db = new Database();
const bcrypt = require('bcrypt');


// router config
router.use(session({ secret: 'ssshhhhh' }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let sess = {};

router.post('/login', async function (req, res) {
  //console.log(req.session);
  let user = await db.findUserByEmail(req.body.email);
  console.log("user: " + user);
  if (bcrypt.compareSync(req.body.password, user.password)) {
    req.session.userId = user.id
    sess = req.session;
    console.log(sess);
    res.end('done');
  } else {
    console.log("Nieprawidłowy email albo hasło.");
    res.end("Nieprawidłowy email albo hasło.");
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('logout successful')
    }
  });
});

  function getSession() {
    return sess;
  }

  module.exports = {
    router,
    getSession
  }

