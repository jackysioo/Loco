const express = require('express'); 
const Router = express.Router();  
const chatController = require('../controllers/chat'); 
const passport = require('passport');
const passportConf = require('../passport');

Router.get('/chats',passport.authenticate('jwt',{session: false}),chatController.getChats);
Router.get('/users',passport.authenticate('jwt',{session: false}),chatController.getUser); 
Router.get('/users',passport.authenticate('jwt',{session: false}),chatController.getUsers); 
Router.post('/users',passport.authenticate('jwt',{session: false}),chatController.postUser); 
Router.get('/messages',passport.authenticate('jwt',{session: false}),chatController.getMessages); 
Router.post('/room',passport.authenticate('jwt',{session: false}),chatController.postRoom);  
Router.post('/messages',passport.authenticate('jwt',{session: false}),chatController.postMessages);  
Router.delete('/room',passport.authenticate('jwt',{session: false}),chatController.deleteRoom); 

module.exports = Router;