const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    resetToken: {
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema);

module.exports = User;