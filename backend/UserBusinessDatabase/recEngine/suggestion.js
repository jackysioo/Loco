const _ = require('underscore');
const SuggestionDb = require('../models/suggestion');
var mongoose = require('mongoose');

module.exports = class Suggestion {
    constructor(engine) {
        this.engine = engine;
    }

    async forUser(userId) {
        return await SuggestionDb.findOne({ user: userId });
    }

    async update(userId) {
        try {
            //find one similar by User id 
            const others = (await this.engine.similars.byUser(userId));  
            const othersSimilarity = others.similarity.map((similar) => {return {user: similar.user.toString(), score: similar.score}});
            
            //find all items the User likes 
            const userLikes = (await this.engine.likes.itemsByUser(userId)).map((objectId) => {return objectId.toString()});
            //find all items the User dislikes
            const userDislikes = (await this.engine.dislikes.itemsByUser(userId)).map((objectId) => {return objectId.toString()});
            //for each similar 


            const items = await Promise.all(othersSimilarity.map(async (other) => {
                return await Promise.all([this.engine.likes, this.engine.dislikes].map(async rater => {
                    return (await rater.itemsByUser(mongoose.Types.ObjectId(other.user))).map((objectId) => {return objectId.toString()});
                }));
            }));

            //find all the unique items the user has not rated yet
            const uniqueItems = _.difference(_.unique(_.flatten(items)), userLikes, userDislikes);
            const suggestions = await Promise.all(uniqueItems.map(async (item) => {

                //find all the users that like and dislike this item
                const likers = (await this.engine.likes.usersByItem(item)).map((objectId) => {return objectId.toString()});
                const dislikers = (await this.engine.dislikes.usersByItem(item)).map((objectId) => {return objectId.toString()});

                var numerator = 0;
                //ref is an array of other users that rated this item, exculding the user 
                const likersLength = _.without(_.flatten(likers), userId.toString()).length;
                var ref = _.without(_.flatten([likers, dislikers]), userId.toString());

                for (var i = 0, len = ref.length; i < len; i++) {
                    var other = ref[i];
                    other = _.findWhere(othersSimilarity, { 
                        user: other
                    }); 
                    // need to check if like or dislike
                    if (other != null) {
                        if (i < likersLength) {
                            numerator += other.score;
                        }
                        else {
                            numerator -= other.score;
                        }
                    }

                }
                return { business: mongoose.Types.ObjectId(item), weight: numerator / _.union(likers, dislikers).length };
            }));

            await SuggestionDb.findOneAndUpdate({ user: userId }, { _id: userId, user: userId, suggestions: suggestions }, { new: true, upsert: true });
        } catch (error) {
            throw new Error(error);
        }
    }
}