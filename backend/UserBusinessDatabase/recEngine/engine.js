const Rater = require('./rater'); 

const Similars = require('./similar'); 

const Suggestion = require('./suggestion'); 




module.exports = class Engine {
    constructor() {
        this.likes = new Rater(this,'likes'); 
        this.dislikes = new Rater(this,'dislikes'); 
        this.similars = new Similars(this); 
        this.suggestions = new Suggestion(this);
    } 

}