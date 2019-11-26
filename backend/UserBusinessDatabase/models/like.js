const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  

const likeSchema = new Schema({   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    },

});  

module.exports = mongoose.model('Like',likeSchema);