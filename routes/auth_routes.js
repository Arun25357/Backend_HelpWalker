var express = require('express');
var router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");

/* GET users listing. */
router.post('/register', function(req, res, next) { 
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        descirption: req.body.descirption

    });
    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
});

router.post('/login', function(req, res, next) {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(data => {
            if(!data) {
                res.status(404).send({ message: "Not found user with email " + req.body.email });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving user with email=" + req.body.email });
        });
});

module.exports = router;