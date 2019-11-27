const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: String,
    date: String,
    review: String,
    rating: Number,
    image: String,
    user: String, 
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    businessId: {type: mongoose.Schema.Types.ObjectId, ref: 'Business'}
});

module.exports = mongoose.model('Review', reviewSchema);