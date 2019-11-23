const Like = require('../models/like'); 
const Dislike = require('../models/dislike'); 

module.exports = class Rater {
    constructor(type) {
      this.type = type;
    }  

    async add(userId,businessId){  
        const object = {user: userId, business: businessId}; 
        var result;
        if(type === 'like'){ 
            result = new Like(object);
        }  
        else{ 
            result = new Dislike(object); 
        } 
        await result.save(); 
    } 

    async remove(userId,businessId){  

        if(type === 'like'){ 
            await Like.findOneAndRemove({ user: userId, business: businessId });
        }  
        else{ 
            await Dislike.findOneAndRemove({ user: userId, business: businessId });
        } 

    } 

    async itemsByUser(userId){  
        var result;
        if(type === 'like'){  
        
           result = await Like.find({ user: userId});
        }  
        else{ 
            result = await Dislike.find({ user: userId});
        }  
        return result;
    }  

    async usersByItem(businessId){ 
        var result;
        if(type === 'like'){ 
           result = await Like.find({ business: businessId});
        }  
        else{ 
            result = await Dislike.find({ business: businessId});
        }  
        return result;
    }


}