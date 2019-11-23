const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');  
const businessRoutes = require('./routes/business');  
const reviewRoutes = require('./routes/review');
const chatRoutes = require('./routes/chat');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/user', userRoutes); 
app.use('/business', businessRoutes); 
app.use('/review',reviewRoutes); 
app.use('/chat',chatRoutes);
var port = process.env.PORT || 1337;
mongoose.connect('mongodb+srv://teamdwtf:teamdwtf@cluster0-pzxbk.mongodb.net/db?retryWrites=true&w=majority')
    .then((result) => { app.listen(port) })
    .catch((err) => console.log(err)); 


