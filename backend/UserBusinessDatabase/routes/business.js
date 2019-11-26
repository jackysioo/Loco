const express = require('express'); 
const Router = express.Router();  
const businessController = require('../controllers/business');

Router.get('/get', businessController.getBusinessData); 
Router.post('/post/:userId',businessController.postBusinessData);
Router.get('/get/:businessId',businessController.getBusinessDataById); 
Router.put('/put/:businessId',businessController.updateBusinessData); 
Router.delete('/delete/:businessId',businessController.deleteBusiness);  


module.exports = Router;
