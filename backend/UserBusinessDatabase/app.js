const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');  
const businessRoutes = require('./routes/business');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded());

app.use('/user', userRoutes); 
app.use('/business', businessRoutes);

mongoose.connect('mongodb+srv://teamdwtf:teamdwtf@cluster0-pzxbk.mongodb.net/db?retryWrites=true&w=majority')
    .then(result => { app.listen(8080) })
    .catch(err => console.log(err)); 
