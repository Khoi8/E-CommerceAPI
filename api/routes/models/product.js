const mongoose = require('mongoose');

// define what our product looks like
const productScheme = mongoose.Schema({
    // type of mongoose with special type Objectid
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
});

// Correct convention is capitalization of the name of the model
module.exports = mongoose.model('Product', productScheme);