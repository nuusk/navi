// UserController.js
// import bibliotek i modelu użytkownika
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// utworzenie instancji routera, który korzysta z modułu biblioteki express
const router = express.Router();


// router config - konfiguracja routera
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// metoda POST do tworzenia nowego użytkownika
router.post('/', function (req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password:  hash,
        localizationImportance: 1,
        ratingImportance: 1,
        priceImportance: 1
    },
        function (err, user) {
            if (err) return res.status(500).send(err);
            res.status(200).send(user);
        });
});

// metoda GET do zwracania wszystkich użytkowników z bazy 
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

//eksport routera
module.exports = router;