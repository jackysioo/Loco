const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: String,
    date: String,
    review: String,
    rating: Number,
    image: String,
    user: String
});

module.exports = mongoose.model('Review', reviewSchema);