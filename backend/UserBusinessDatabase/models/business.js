const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
    title: {
        type: String
    },
    user: {
        type: String
    },
    about: {
        type: String
    },
    profilePic: {
        type: String
    },
    images: [
        { type: String }
    ],
    rating: {
        type: Number
    },
    region: {
        type: String
    },
    location: {
        type: Object
    },
    price: {
        type: String
    },
    tags: [
        { type: String }
    ],
    reviews: [
        {
            title: String,
            date: String,
            review: String,
            rating: Number,
            image: String,
            user: String
        }
    ]


});

module.exports = mongoose.model('Business', businessSchema);