const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); 
app.use(bodyParser.json()); 

app.use('/user', userRoutes);

mongoose.connect('mongodb+srv://teamdwtf:teamdwtf@cluster0-pzxbk.mongodb.net/db?retryWrites=true&w=majority')
    .then(result => { app.listen(8080) })
    .catch(err => console.log(err)); 
