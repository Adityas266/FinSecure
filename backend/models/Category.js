// define the category module
const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('Category', catSchema);