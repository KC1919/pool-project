const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    mobile: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const Membership = mongoose.model('membership', memberSchema);

module.exports = Membership;