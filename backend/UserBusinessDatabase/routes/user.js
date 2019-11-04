const express = require('express'); 
const Router = express.Router();  
const userController = require('../controllers/user');

<<<<<<< HEAD
router.get('/get', userController.getUserData); 
router.post('/post',userController.postUserData);
router.get('/get/:userId',userController.getUserDataById); 
router.put('/put/:userId',userController.updateUserData);  
router.put('/putReview/:userId',userController.updateReview); 
router.put('/putService/:userId',userController.updateService); 
router.delete('/delete/:userId',userController.deleteUser); 
=======
Router.get('/get', userController.getUserData); 
Router.post('/post',userController.postUserData);
Router.get('/get/:userId',userController.getUserDataById); 
Router.put('/put/:userId',userController.updateUserData);  
Router.put('/putReviewService/:userId',userController.updateReviewService);
Router.delete('/delete/:userId',userController.deleteUser); 
>>>>>>> bb9578efb7da821af396ab4e8a2d0329f316fd28

module.exports = Router;
