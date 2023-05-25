const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema);

module.exports = User;