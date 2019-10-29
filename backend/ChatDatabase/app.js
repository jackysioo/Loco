// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const socketIo = require('socket.io');

// const port = process.env.PORT || 1337;
// const index = require("./routes/index"); //change this
// app.use(index);
// const server = http.createServer(app);
// const io = socketIo(server); // < Interesting!

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
//const axios = require("axios");
const port = process.env.PORT || 1337;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!


io.on("connection", socket => {
    console.log("New client connected");
    socket.emit("message", "hi my name is jeff");
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

server.listen(port, () => console.log(`Listening on port ${port}`));





// //database connection
// const  Chat  = require("./models/Chat");
// const  connect  = require("./dbconnect");



// // app.get('/', function(req, res) {
// //     res.send('Hello world!');
// // });

// // const server = http.listen(8080, function() {
// //     console.log('listening on *:8080');
// // });

// const port = 500;

// const socket = io(http);
// //create an event listener

// //To listen to messages
// socket.on('connection', (socket)=>{
// console.log('user connected');
// });

// //wire up the server to listen to our port 500
// http.listen(port, ()=>{
// console.log('connected to port: '+ port)
// });

// socket.on("chat message", function(msg) {
//     console.log("message: "  +  msg);
//     //broadcast message to everyone in port:5000 except yourself.
//     socket.broadcast.emit("received", { message: msg  });
//     });
//     });