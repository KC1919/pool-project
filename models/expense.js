const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    "date": {
        type: Date,
        required: true,
        default: Date.now
    },
    "expense": [{
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    "totalCost": {
        type: Number,
        required: true,
        default: 0
    }
})

const Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;