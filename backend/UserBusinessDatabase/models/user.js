const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const userSchema = new Schema({ 
  username: String,
  firstName: String, 
  lastName: String,
  profilePic: String,
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  addressLine: String, 
  addressCity: String, 
  addressProvince: String, 
  addressPostalCode: String, 
  phoneNumber: String, 
  bio: String,
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