const express = require('express'); 
const Router = express.Router();  
const userController = require('../controllers/user');
const passport = require('passport');
const passportConf = require('../passport');


Router.get('/getSuggestions/:userId', userController.getSuggestions); 
Router.post('/signUp',userController.signUp); 
Router.post('/signIn',passport.authenticate('local',{session: false}),userController.signIn);
Router.get('/get/:userId',passport.authenticate('jwt',{session: false}),userController.getUserDataById); 
Router.put('/put/:userId',passport.authenticate('jwt',{session: false}),userController.updateUserData);  
Router.delete('/delete/:userId',passport.authenticate('jwt',{session: false}),userController.deleteUser); 

module.exports = Router;
