const SimilarDb = require('../models/similar');
const _ = require('underscore');

module.exports = class Similar {
    constructor(engine) {
        this.engine = engine;
    }

    async byUser(userId) {
        return await SimilarDb.findOne({ user: userId });
    }

    async update(userId) { 
        try{
        const userLikes = await this.engine.likes.itemsByUser(userId);
        const userDislikes = await this.engine.dislikes.itemsByUser(userId);
        const items = _.flatten([userLikes,userDislikes]); 

        const others = await Promise.all(items.map(async (item) => { 
           return await Promise.all([this.engine.likes,this.engine.dislikes].map(async (rater) => { 
               return await rater.usersByItem(item);
            }));
        }));
        
        const uniqueOthers =  _.without(_.unique(_.flatten(others)),userId);
        const similarity = await Promise.all(uniqueOthers.map(async (other) => { 
            const otherLikes = await this.engine.likes.itemsByUser(other); 
            const otherDislikes = await this.engine.dislikes.itemsByUser(other);  
            const similarScore = (_.intersection(userLikes, otherLikes).length+_.intersection(userDislikes, otherDislikes).length-_.intersection(userLikes, otherDislikes).length-_.intersection(userDislikes, otherLikes).length) / _.union(userLikes, otherLikes, userDislikes, otherDislikes).length; 

            return {user: other,score: similarScore};
        }));  

        await SimilarDb.findOneAndUpdate({ user: userId }, {_id: userId,user: userId, similarity: similarity}, { new: true, upsert: true }); 
        }catch(error){ 
            throw new Error(error);
          }
    }
}