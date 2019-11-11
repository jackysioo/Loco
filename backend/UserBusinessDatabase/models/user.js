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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  services: [{
    title: String,
    rating: Number,
    image: String
  }], 
  searchId: String
}); 

module.exports = mongoose.model('User',userSchema);