const User = require('../models/user');
const Business = require('../models/business');
const Search = require('../models/search'); 
const Review = require('../models/review');

exports.updateReview = async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const result = await Review.findOneAndUpdate({ _id: reviewId }, req.body.review, { new: true })

        if (!result) {
            const error = new Error('Could not find review');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: 'updated', review: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.addReview = async (req, res, next) => {
    try {
        const review = new Review(req.body.review);  
        const reviewId = await review.save();  

        const userId = req.params.userId;
        const user = await User.findById(userId);  
        user.reviews.push({_id: reviewId._id});  
        await user.save();  

        const businessId = req.params.businessId;
        const business = await Business.findById(businessId);  
        business.reviews.push({_id: reviewId._id});  
        await business.save();  

        const result = await user.populate('reviews').execPopulate(); 
        res.status(200).json({ message: 'added', review: result.reviews[result.reviews.length - 1]});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

} 
 

exports.deleteReview = async (req, res, next) => {
    try {

        const reviewId = req.params.reviewId; 
        const user = await User.findById(req.params.userId);   
        console.log(req.params.userId); 
        
        await User.update(
            {  "_id": req.params.userId,"reviews": reviewId },
            { "$pull": { "reviews": reviewId } },
            { "multi": true });  

        const business = await Business.findById(req.params.businessId);  
  
        await Business.update(
            {   "_id": req.params.businessId,"reviews": reviewId },
            { "$pull": { "reviews": reviewId } },
            { "multi": true });  

        const result = await Review.findByIdAndDelete(reviewId); 

        res.status(200).json({ message: 'added', review: result});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}