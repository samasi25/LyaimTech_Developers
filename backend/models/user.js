const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true,
    },
    referralCode: {
        type: String,
    },

    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User;
