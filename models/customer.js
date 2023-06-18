const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    cid: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    entryTime: {
        type: String,
        required: true
    },
    tableNumber: {
        type: String,
        required: true
    },
    tableSize: {
        type: String,
        required: true
    },
    exitTime: {
        type: String
    },
    order: [{
        itemId: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true,
            default: 0
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    totalAmount: {
        type: Number,
        default: 0
    },
    paymentMode: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;