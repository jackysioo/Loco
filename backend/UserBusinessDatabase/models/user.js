const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const userSchema = new Schema({ 
    firstName: { 
        type: String, 
        required: true
    }, 
    lastName: { 
        type: String, 
        required: true
    },  
    userName: { 
        type: String, 
        required: true
    },
    businesses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business"
        }
    ]
}); 

module.exports = mongoose.model('User',userSchema);