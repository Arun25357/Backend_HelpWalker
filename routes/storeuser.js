const User = require("../models/user");

module.exports = (req, res) => {
    User.create(req.body).then((user) => {
        console.log("User created successfully");
        res.redirect("/");
    }).catch((err) => {
        if(error) {
            const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
            req.flash("validationErrors", validationErrors);
            req.flash("data", req.body);
            return res.redirect("/register");
        }
    });
};

