const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");

const app = express();
const instance_locator_id = "v1:us1:0d19d6c4-7553-472b-8f65-3af90e0c9407";
const chatkit_secret = "4ed3e048-d5fe-4872-96bc-dac27927a3c7:63sb/WHWfDrL3TPGwImk2MS1xdtfXZlIjLQJ+HRom5s=";

const chatkit = new Chatkit.default({
  instanceLocator: instance_locator_id,
  key: chatkit_secret
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("all green!");
});


//retrieve all private chats user is a part
//returns list of users the current user has chatted with
app.get("/allrooms", (req, res) => {
  const { userID } = req.body;
  var roomIDList = []
  
  chatkit.getUserRooms({
    userId: userID,
  })
    .then((res) => {
      console.log("All user's rooms:")
      console.log(res)
      for (let room of res) {
          roomIDList.push(room.id)
      }
      res.status(200).json({ 
        roomIDList: roomIDList
      })
    })
    .catch(err => console.error(err))

});


//retrieve messages from roomID
//if it's the first time retrieving messages, get messages from chatkit without initial meessage ID
//returns Array of messages for that chat
app.get("/messages", (req, res) => {
  const { roomID, initialID } = req.body;

  if (initialID !== undefined) {
    chatkit.fetchMultipartMessages({
      roomId: roomID,
      initialId: initialID
    })
      .then(messages => {
        res.status(200).json({ 
          messages: messages,
          nextMessageID: res[messages.length - 1].id,
        })
      })
      .catch(err => console.error(err))
  } else {
    chatkit.fetchMultipartMessages({
      roomId: roomID,
    })
      .then(messages => {
        res.status(200).json({ 
          messages: messages,
          nextMessageID: res[messages.length - 1].id,
        })
      })
      .catch(err => console.error(err))
  }

  
});





const PORT = 3000;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on ports ${PORT}`);
  }
});