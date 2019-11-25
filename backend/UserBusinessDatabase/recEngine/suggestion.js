_ = require('underscore'); 
SuggestionDb = require('../models/suggestion');

module.exports = class Suggestion {
    constructor(engine) {
      this.engine = engine;
    }  

    async forUser(userId){  
        return await SuggestionDb.findOne({ user: userId });
    } 

    async update(userId){   
        try{
        //find one similar by User id 
        const others = await this.engine.similars.byUser(userId); 
        //find all items the User likes 
        const userLikes = await this.engine.likes.itemsByUser(userId);
        //find all items the User dislikes
        const userDislikes = await this.engine.dislikes.itemsByUser(userId);
        //for each similar 

         
        const items = others.similarity.map((other) => { 
           return [this.engine.likes,this.engine.dislikes].map(rater => { 
               return rater.itemsByUser(other.user);
            });
        }); 

        //find all the unique items the user has not rated yet
        const uniqueItems= _.difference(_.unique(_.flatten(items)),userLikes,userDislikes); 
        const suggestions = uniqueItems.map( async (item) => { 

            //find all the users that like and dislike this item
            const likers = await this.engine.likes.usersByItem(item); 
            const dislikers =await this.engine.dislikes.usersByItem(item); 

            var numerator = 0;
            //ref is an array of other users that rated this item, exculding the user 
            var ref = _.without(_.flatten([likers,dislikers]),userId);  
            var len;

            for(var i = 0, len = ref.length; i < len; i++){  
                var other = ref[i]; 
                other = _.findWhere(others.similarity, { 
                    user: other
                }); 

                // need to check if like or dislike
                if(other != null){ 
                    numerator += other.score;
                }

            } 
            return {item: item, weight: numerator / _.union(likers,dislikers).length};
        }); 
 
        SuggestionDb.findOneAndUpdate({ user: userId }, {_id: userId, user: userId, suggestions: suggestions}, { new: true,upsert: true });
    }catch(error){ 
        throw new Error(error);
      }
    } 
}