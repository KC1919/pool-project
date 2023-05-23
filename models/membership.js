const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    mobile: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    }
})

const Membership = mongoose.model('membership', memberSchema);

module.exports = Membership;