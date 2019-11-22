const express = require('express'); 
const Router = express.Router();  
const userController = require('../controllers/user');
const passport = require('passport');
const passportConf = require('../passport');

Router.get('/get', userController.getUserData); 
Router.post('/signUp',userController.signUp); 
Router.post('/signIn',passport.authenticate('local',{session: false}),userController.signIn);
Router.get('/get/:userId',userController.getUserDataById); 
Router.put('/put/:userId',passport.authenticate('jwt',{session: false}),userController.updateUserData);  
Router.put('/putService/:userId',userController.updateService); 
Router.post('/postService/:userId',userController.addService); 
Router.delete('/delete/:userId',userController.deleteUser); 

module.exports = Router;
