const express = require('express'); 
const Router = express.Router();  
const businessController = require('../controllers/business'); 
const passport = require('passport');
const passportConf = require('../passport');

Router.get('/get',passport.authenticate('jwt',{session: false}), businessController.getBusinessData); 
Router.post('/post/:userId',passport.authenticate('jwt',{session: false}),businessController.postBusinessData);
Router.get('/get/:businessId',passport.authenticate('jwt',{session: false}),businessController.getBusinessDataById); 
Router.put('/put/:businessId',passport.authenticate('jwt',{session: false}),businessController.updateBusinessData); 
Router.delete('/delete/:businessId',passport.authenticate('jwt',{session: false}),businessController.deleteBusiness);  


module.exports = Router;
