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
        if(this.type === 'likes'){ 
            result = new Like(object);
        }  
        else{ 
            result = new Dislike(object); 
        } 
        await result.save();  

    } 

    async remove(userId,businessId){  

        if(this.type === 'likes'){ 
            await Like.findOneAndRemove({ user: userId, business: businessId });
        }  
        else{ 
            await Dislike.findOneAndRemove({ user: userId, business: businessId });
        } 
    } 

    async itemsByUser(userId){   
        try{
        var result;
        if(this.type === 'likes'){  
        
           const temp = await Like.find({ user: userId});
           result = temp.map((object) => { 
            return object.business;
         }); 
        }  
        else{ 
            const temp = await Dislike.find({ user: userId}); 
            result = temp.map((object) => { 
                return object.business;
             }); 
        }  

        return result; 
        }catch(error){ 
            throw new Error(error);
          }
    }  

    async usersByItem(businessId){ 
       try{
        var result;
        if(this.type === 'likes'){ 
           const temp = await Like.find({ business: businessId}); 
           result = temp.map((object) => { 
               return object.user;
           }); 
        
        }  
        else{ 
            const temp = await Dislike.find({ business: businessId}); 
           result = temp.map((object) => { 
               return object.user;
           }); 
        }  
        return result; 
    }catch(error){ 
            throw new Error(error);
          }
    }


}