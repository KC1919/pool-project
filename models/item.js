const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({

    itemId: {
        type: Number,
        required: true,
        default: () => Math.floor(Math.random() * 90000) + 10000
    },
    name: {
        type: String,
        required: true
    },
    costPrice: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
})

const Item = mongoose.model('items', itemSchema);

module.exports = Item;