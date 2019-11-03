const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    distance: {
        type: Number
    },
    price: {
        type: String
    },
    rating: {
        type: String
    },
    location: {
        type: Object
    }


});

module.exports = mongoose.model('Search', searchSchema);