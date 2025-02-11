var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, address} = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, phone, address});

        const savedUser = await user.save();
        res.status(201).json({ message: "User registered successfully", user: savedUser });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

module.exports = router;
