const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const bcrypt = require('bcryptjs');

const userSchema = new Schema({ 
  username: {type: String, required: true,unique: true},
  password: {type: String, required: true}, 
  email: String,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  }], 
  searchId: String
});  

userSchema.methods.encrypt = async function(){  
  try{ 
   const salt = await bcrypt.genSalt(10); 
  const hashedPassword =  await bcrypt.hash(this.password,salt); 
  this.password = hashedPassword;
  }catch(error){ 
    throw new Error(error);
  }

}; 

userSchema.methods.isValidPassword = async function(newPassword){ 
  try{ 
   return await bcrypt.compare(newPassword,this.password);
  }catch(error){ 
    throw new Error(error);
  }
}

module.exports = mongoose.model('User',userSchema);