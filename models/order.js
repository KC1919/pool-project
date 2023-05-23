const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    cid: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [{
        itemName: {
            type: String,
            required
        },
        qty: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    date: {
        type: Date
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})