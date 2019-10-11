const express = require('express');  
const homeController = require('../controllers/home');
const router = express.Router(); 
router.get('/posts',homeController.getPosts); 
module.exports = router;