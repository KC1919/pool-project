const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    cid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    entryTime: {
        type: String,
        required: true
    },
    tableNumber: {
        type: String,
        required: true
    },
    exitTime: {
        type: String
    },
    order: [{
        itemName: {
            type: String,
            required
        },
        qty: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number
        }
    }],
    totalAmount: {
        type: Number
    },
    date: {
        type: Date
    }
}, {
    timestamps: true
})

const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;