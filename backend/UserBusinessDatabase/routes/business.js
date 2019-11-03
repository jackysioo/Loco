const express = require('express'); 
const router = express.Router();  
const businessController = require('../controllers/business');

router.get('/get', businessController.getBusinessData); 
router.post('/post',businessController.postBusinessData);
router.get('/get/:businessId',businessController.getBusinessDataById); 
router.put('/put/:businessId',businessController.updateBusinessData); 
router.delete('/delete/:businessId',businessController.deleteBusiness);  


module.exports = router;