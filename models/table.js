const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    reserved_status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Table = mongoose.model('table', tableSchema);

module.exports = Table;