const express = require('express'); 
const Router = express.Router();  
const reviewController = require('../controllers/review'); 
const passport = require('passport');
const passportConf = require('../passport');


Router.put('/put/:reviewId',passport.authenticate('jwt',{session: false}),reviewController.updateReview); 
Router.post('/post/:userId/:businessId',passport.authenticate('jwt',{session: false}),reviewController.addReview); 
Router.delete('/delete/:reviewId/',passport.authenticate('jwt',{session: false}),reviewController.deleteReview); 


module.exports = Router;
