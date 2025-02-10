var express = require('express');
var router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");

/* GET users listing. */
router.post('/register', async function(req, res, next) { 
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Missing required fields" });
    }    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        descirption: req.body.descirption

    });

    const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already exists" });
    }

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



module.exports = router;