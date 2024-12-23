const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    score: Number,
    updated_at: { type: Date, default: Date.now }
});




module.exports = mongoose.model('User', userSchema);