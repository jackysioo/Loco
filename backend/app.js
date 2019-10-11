const express = require('express'); 
const app = express();  
const homeRoutes = require('./routes/home');
app.use('/home',homeRoutes);
app.listen(8080);