const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validate input fields
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            score: 0,
            updated_at: Date.now()
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt with email: ${email}`);
        
        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password match: ${isMatch}`);
        
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, user });
    } catch (err) {
        next(err);
    }
});



module.exports = router;