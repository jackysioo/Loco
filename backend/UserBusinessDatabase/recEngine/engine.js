const Rater = require('./Rater'); 

const Similars = require('./Similars'); 

const Suggestion = require('./Suggestion'); 




module.exports = class Engine {
    constructor() {
        this.likes = new Rater(this,'likes'), 
        this.dislikes = new Rater(this,'dislikes'), 
        this.similars = new Similars(this); 
        this.suggestions = new Suggestion(this);
    } 

}