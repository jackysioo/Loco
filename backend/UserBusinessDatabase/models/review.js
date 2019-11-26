const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: String,
    date: String,
    review: String,
    rating: Number,
    image: String,
    user: String, 
    userId: mongoose.Schema.Types.ObjectId, 
    businessId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Review', reviewSchema);