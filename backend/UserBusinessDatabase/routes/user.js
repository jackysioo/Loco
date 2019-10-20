const express = require('express'); 
const router = express.Router();  
const userController = require('../controllers/user');

router.get('/get', userController.getUserData); 
router.post('post',userController.postUserData);
router.get('/get/:userId',userController.getUserDataById); 
router.put('/put/:userId',userController.updateUserData); 
router.delete('/delete/:userId',userController.deletePost)
module.exports = router;