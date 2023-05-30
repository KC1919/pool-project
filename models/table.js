const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    size: {
        type: String
    },
    price: {
        type: Number
    }
})

const Table = mongoose.model('table', tableSchema);

module.exports = Table;