const Similar = require('../models/similar');
const _ = require('underscore');

module.exports = class Similar {
    constructor(engine) {
        this.engine = engine;
    }

    async byUser(userId) {
        return await Similar.findOne({ user: userId });
    }

    async update(userId) {
        const userLikes = await engine.likes.itemsByUser(userId);
        const userDislikes = await engine.dislikes.itemsByUser(userId);
        const items = _.flatten([likes,dislikes]); 

        const others = await items.map((item) => { 
           return [engine.likes,engine.dislikes].map(rater => { 
               return rater.usersByItems(item);
            });
        });
        
        others = _.without(_.unique(_.flatten(others)));
        const similarity = others.map(async (other) => { 
            const otherLikes = await engine.likes.itemsByUser(other); 
            const otherDislikes = await engine.dislikes.itemsByUser(other);  
            const similarScore = (_.intersection(userLikes, otherLikes).length+_.intersection(userDislikes, otherDislikes).length-_.intersection(userLikes, otherDislikes).length-_.intersection(userDislikes, otherLikes).length) / _.union(userLikes, otherLikes, userDislikes, otherDislikes).length; 

            return {user: other,score: similarScore};
        });  

        const result = new Similar({_id: userId, user: userId, similarity: similarity }); 
        await result.save();
    }
}