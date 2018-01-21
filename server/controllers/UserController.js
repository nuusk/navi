// UserController.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const bcrypt = require('bcrypt');


// router config

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// CREATES A NEW USER
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
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});
module.exports = router;