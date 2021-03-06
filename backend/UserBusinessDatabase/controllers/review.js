const User = require('../models/user');
const Business = require('../models/business');
const Search = require('../models/search'); 
const Review = require('../models/review'); 
const Engine = require('../recEngine/engine'); 

const e = new Engine(); 

async function addData(rating,userId,businessId){ 
    if(rating >= 3.0){ 
        await e.likes.add(userId,businessId);
    } 
    else{  
      await  e.dislikes.add(userId,businessId);
    }
} 

async function updateData(prevRating,rating,userId,businessId){ 
    if(rating >= 3.0 && prevRating < 3.0){ 
        await e.dislikes.remove(userId,businessId); 
        await e.likes.add(userId,businessId);
    } 
    else if(rating < 3.0 && prevRating >= 3.0){ 
        await e.likes.remove(userId,businessId); 
        await e.dislikes.add(userId,businessId);
    }
} 

async function deleteData(rating,userId,businessId){ 
    if(rating >= 3.0){ 
        await e.likes.remove(userId,businessId);
    } 
    else{  
      await  e.dislikes.remove(userId,businessId);
    }
} 

async function calcRating(businessId){ 
   const business = await Business.findById(businessId)
        .populate('reviews')
        .exec();
    const result = (business.reviews.reduce((a, { rating }) => a + rating, 0) / business.reviews.length);
    return result;
}

exports.updateReview = async (req, res, next) => {
    try {
        const rating = req.body.rating; 
        const reviewId = req.params.reviewId; 

        const prevReview = await Review.find({ _id: reviewId});
        const userId = prevReview.userId; 
        const businessId = prevReview.businessId; 
        const prevRating = prevReview.prevRating;

        const result = await Review.findOneAndUpdate({ _id: reviewId }, req.body.review, { new: true });

        if (!result) {
            const error = new Error('Could not find review');
            error.statusCode = 404;
            throw error;
        } 

        await updateData(prevRating,rating,userId,businessId);  
        const newRating = await calcRating(result.businessId); 
        await Business.findOneAndUpdate({ _id: result.businessId }, {rating: newRating}, { new: true });

        const resultReview = await Review.findById(reviewId);
        var populateResult = await resultReview.populate('userId').populate({ 
            path: 'businessId',
            populate: {
                path: 'user',
            } 
        }).execPopulate(); 
        res.status(200).json({ message: 'updated', review: populateResult });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.addReview = async (req, res, next) => {
    try { 
        const rating = req.body.review.rating;
        const review = new Review({...req.body.review,userId: req.params.userId, businessId: req.params.businessId });  
        const reviewId = await review.save();  

        const userId = req.params.userId;
        const user = await User.findById(userId);  
        user.reviews.push({_id: reviewId._id});  
        await user.save();  

        const businessId = req.params.businessId;
        const business = await Business.findById(businessId);  
        business.reviews.push({_id: reviewId._id});  
        await business.save();   

        await addData(rating,userId,businessId); 
        const newRating = await calcRating(reviewId.businessId); 
        await Business.findOneAndUpdate({ _id: reviewId.businessId }, {rating: newRating}, { new: true });

        const popReview = await Review.findById(reviewId._id);
        const result = await popReview.populate('userId').populate({ 
            path: 'businessId',
            populate: {
                path: 'user',
            } 
        }).execPopulate(); 
        res.status(200).json({ message: 'added', review: result});
 
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
        const review = await Review.findById(req.params.reviewId);   

        console.log(req.params.userId); 
        
        await User.update(
            {  "_id": review.userId,"reviews": reviewId },
            { "$pull": { "reviews": reviewId } },
            { "multi": true });  

 
  
        await Business.update(
            {   "_id": review.businessId,"reviews": reviewId },
            { "$pull": { "reviews": reviewId } },
            { "multi": true });  

        const result = await Review.findByIdAndDelete(reviewId); 
        
        await deleteData(reviewId,review.userId,review.businessId);
        const newRating = await calcRating(review.businessId); 
        await Business.findOneAndUpdate({ _id: review.businessId }, {rating: newRating}, { new: true });
        res.status(200).json({ message: 'deleted', review: result});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}