
module.exports = class Suggestion {
    constructor(engine) {
      this.engine = engine;
    }  

    async forUser(userId){  
        return await Suggestion.findOne({ user: userId });
    } 

    async update(userId){  
        const others = await engine.similar.byUser(userId); 
        const userLikes = await engine.likes.itemsByUser(userId);
        const userDislikes = await engine.dislikes.itemsByUser(userId);

        const items = others.map((other) => { 
           return [engine.likes,engine.dislikes].map(rater => { 
               return rater.itemsByUser(other);
            });
        }); 

        items= _.difference(_.unique(_.flatten(items)),userLikes,userDislikes); 
        const suggestions = items.map( async (item) => { 
            const likers = await this.engine.likes.usersByItem(item); 
            const dislikers =await this.engine.dislikes.usersByItem(item); 
            var numerator = 0; 
            var ref = _.without(_.flatten([likers,dislikers]),userId);  
            var len;
            for(var i = 0, len = ref.length; i < len; i++){  
                var other = ref[i]; 
                other = _.findWhere(others, { 
                    user: other
                }); 
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