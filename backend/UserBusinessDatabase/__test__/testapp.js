const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('../routes/user');  
const businessRoutes = require('../routes/business'); 
const reviewRoutes = require('../routes/review');
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
var port = process.env.PORT || 1337; 
var result = app.listen(3000);

module.exports = result;