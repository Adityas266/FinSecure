// define the user module
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    });

module.exports = mongoose.model('User', userSchema);;