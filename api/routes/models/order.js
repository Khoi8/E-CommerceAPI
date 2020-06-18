const mongoose = require('mongoose');

// define what our order looks like
const orderScheme = mongoose.Schema({
    // type of mongoose with special type Objectid
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {type: Number, default: 1}
});

// Correct convention is capitalization of the name of the model
module.exports = mongoose.model('Order', orderScheme);