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
        type: String,
        required: true
    },
    entryTime: {
        type: String,
        required: true
    },
    tableNumber: {
        type: String,
        required: true,
        default:null
    },
    tableSize: {
        type: String,
        required: true,
        default:null
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
            type: mongoose.Types.Decimal128,
            required: true,
            default: 0,
            min: 0
        }
    }],
    orderAmount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    totalPaidAmount: {
        type: Number,
        default: 0
    },
    paymentMode: {
        type: String
    },
    paymentStatus: {
        type: Boolean,
        default: false
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