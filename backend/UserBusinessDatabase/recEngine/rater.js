const Like = require('../models/like'); 
const Dislike = require('../models/dislike'); 

module.exports = class Rater {
    constructor(engine,type) { 
    this.engine = engine;
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
       await this.engine.similars.update(userId); 
        await this.engine.suggestions.update(userId);
    } 

    async remove(userId,businessId){  

        if(type === 'like'){ 
            await Like.findOneAndRemove({ user: userId, business: businessId });
        }  
        else{ 
            await Dislike.findOneAndRemove({ user: userId, business: businessId });
        } 
       await this.engine.similars.update(userId); 
        await this.engine.suggestions.update(userId);
    } 

    async itemsByUser(userId){  
        var result;
        if(type === 'like'){  
        
           const temp = await Like.find({ user: userId});
           result = temp.map(async (object) => { 
            return {business: object.business};
         }); 
        }  
        else{ 
            const temp = await Dislike.find({ user: userId}); 
            result = temp.map(async (object) => { 
                return {business: object.business};
             }); 
        }  

        return result;
    }  

    async usersByItem(businessId){ 
        var result;
        if(type === 'like'){ 
           const temp = await Like.find({ business: businessId}); 
           result = temp.map(async (object) => { 
               return {user: object.user};
           }); 
        
        }  
        else{ 
            const temp = await Dislike.find({ business: businessId}); 
           result = temp.map(async (object) => { 
               return {user: object.user};
           }); 
        }  
        return result;
    }


}