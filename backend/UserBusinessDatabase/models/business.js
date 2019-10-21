const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const businessSchema = new Schema({ 
    businessName: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true
    }
}); 

module.exports = mongoose.model('Business',businessSchema);