const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  

const suggestionSchema = new Schema({    
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    suggestions: [{
       business :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business'
        }, 
        weight: Number
        
    }]

});  

module.exports = mongoose.model('Suggestion',suggestionSchema);

