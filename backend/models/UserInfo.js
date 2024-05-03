// define the user module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userinfoSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    profession: { type: String, enum: ['Student', 'Business', 'Employee', 'Homemaker'], default: 'Employee' },
    transaction: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    category: [{
        details: { type: Schema.Types.ObjectId, ref: 'Category' },
        limit:{type: Number, default: 0}
    }],
    MoneyBox: [{type: Schema.Types.ObjectId, ref: 'MoneyBox'}],
});


module.exports = mongoose.model('UserInfo', userinfoSchema);