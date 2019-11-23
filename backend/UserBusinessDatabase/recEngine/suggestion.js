
module.exports = class Suggestion {
    constructor(engine) {
      this.engine = engine;
    }  

    async forUser(userId){  
        return await Suggestion.findOne({ user: userId });
    } 

    async update(userId){  
        //find one similar by User id 
        const others = await engine.similar.byUser(userId); 
        //find all items the User likes 
        const userLikes = await engine.likes.itemsByUser(userId);
        //find all items the User dislikes
        const userDislikes = await engine.dislikes.itemsByUser(userId);
        //for each similar 

         
        const items = others.similarity.map((other) => { 
           return [engine.likes,engine.dislikes].map(rater => { 
               return rater.itemsByUser(other);
            });
        }); 

        //find all the unique items the user has not rated yet
        items= _.difference(_.unique(_.flatten(items)),userLikes,userDislikes); 
        const suggestions = items.map( async (item) => { 

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
                    numerator += other.similarity;
                }

            } 
            return {item: item, weight: numerator / _.union(likers,dislikers).length};
        }); 
 
        const result = new Suggestion({user: userId, suggestions: suggestions}); 
        result.save();

    } 
}