// define the user module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    amount: Number,
    acc: String,
    date: String,
    category: String,
    transaction_type: { type: String, enum: ['Income', 'Expense'], default: 'Expense' },
});

transactionSchema.index({ date: 1 });
module.exports = mongoose.model('Transaction', transactionSchema);