const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
    // },
    // phone: {
    //     type: String,
    //     required: [true, 'Phone is required']
    // },
    // address: {
    //     type: String,
    //     required: [true, 'Address is required']
    // },
    // description: {
    //     type: String,
    //     required: [true, 'Description is required']
    // },
    // score: {
    //     type: Number,
    //     default: 0
    // },
    // role: {
    //     type: String,
    //     default: 'user'
    // }

});

userSchema.set('save', function(next) {
    const uesr = this;

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    }).catch(err => {
        console.log("Error in hashing password");
        next();
    });
});



const User = mongoose.model('User', userSchema);
module.exports = User; 