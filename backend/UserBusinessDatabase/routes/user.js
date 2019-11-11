const express = require('express'); 
const Router = express.Router();  
const userController = require('../controllers/user');

Router.get('/get', userController.getUserData); 
Router.post('/post',userController.postUserData);
Router.get('/get/:userId',userController.getUserDataById); 
Router.put('/put/:userId',userController.updateUserData);  
Router.put('/putService/:userId',userController.updateService); 
Router.put('/postService/:userId',userController.addService); 
Router.delete('/delete/:userId',userController.deleteUser); 

module.exports = Router;
