const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  

const similarSchema = new Schema({    
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    similarity: [{
       user :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        score: Number
        
    }]

});  

module.exports = mongoose.model('Similar',similarSchema);

