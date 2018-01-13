// UserController.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const User = require('../models/user');

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            localizationImportance: 0,
            ratingImportance: 0,
            priceImportance: 0,
            wantsToBeQuestioned: null
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