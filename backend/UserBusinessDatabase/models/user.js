const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const userSchema = new Schema({ 
  userName: String,
  fullName: String,
  profilePic: String,
  following: Number,
  address: [
        { type: String }
    ],
  birthday: String,
  reviews: [{
    title: String,
    date: String,
    review: String,
    rating: Number,
    image: String,
    user: String
  }],
  services: [{
    title: String,
    rating: Number,
    image: String
  }]
}); 

module.exports = mongoose.model('User',userSchema);