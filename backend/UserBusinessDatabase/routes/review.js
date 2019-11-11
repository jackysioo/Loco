const express = require('express'); 
const Router = express.Router();  
const reviewController = require('../controllers/review');


Router.put('/put/:reviewId',reviewController.updateReview); 
Router.post('/post/:userId/:businessId',reviewController.addReview); 
Router.delete('/delete/:reviewId/:userId/:businessId',reviewController.deleteReview); 


module.exports = Router;
