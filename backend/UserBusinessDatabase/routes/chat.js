const express = require('express'); 
const Router = express.Router();  
const chatController = require('../controllers/chat');

Router.get('/', chatController.getMain); 
Router.get('/chats',chatController.getChats);
Router.get('/users',chatController.getUsers); 
Router.get('/messages',chatController.getMessages); 
Router.post('/room',chatController.postRoom);  
Router.post('/messages',chatController.postMessages);  
Router.delete('/room',chatController.deleteRoom); 

module.exports = Router;