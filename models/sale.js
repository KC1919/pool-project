const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
        // default: new Date().toLocaleDateString()
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    totalCustomer: {
        type: Number,
        default: 0
    },
    totalProfit: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Sale = mongoose.model('sale', saleSchema);

module.exports = Sale;