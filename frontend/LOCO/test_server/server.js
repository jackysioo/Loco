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


//GET list of chatrooms the current user has chatted with
app.get("/allchats", (req, res) => {
  const { userID } = req.body;

  chatkit.getUserRooms({
    userId: userID,
  })
    .then((res) => {
      console.log("All user's chatrooms:")
      console.log(res)
      res.json({
        roooms: res
      })
    })
    .catch(err => console.error(err))
});


//GET list of all the userIDs of users the current user has chated with
app.get("/allusers", (req, res) => {
  const { userID } = req.body;
  var userIDs = []

  chatkit.getUserRooms({
    userId: userID,
  })
    .then((rooms) => {
      for (let room of rooms) {
        for (let userID of room.member_user_ids) {
          userIDs.push(userID)
        }
      }
      res.json({
        userIDs: userIDs
      })
    })
    .catch(err => console.error(err))
});



//GET array of messages of current chatroom history and the messageID of the next message to be loaded
//if it's the first time retrieving messages, get messages from chatkit without initial meessage ID
app.get("/messages", (req, res) => {
  const { roomID, initialID } = req.body;

  if (initialID !== undefined) {
    chatkit.fetchMultipartMessages({
      roomId: roomID,
      initialId: initialID
    })
      .then((messages) => {
        res.json({
          messages: messages,
          nextMessageID: res[messages.length - 1].id,
        })
      })
      .catch(err => console.error(err))
  } else {
    chatkit.fetchMultipartMessages({
      roomId: roomID,
    })
      .then((messages) => {
        res.json({
          messages: messages,
          nextMessageID: res[messages.length - 1].id,
        })
      })
      .catch(err => console.error(err))
  }
});


//POST create new room with current userID and other userID
app.post("/room", (req, res) => {
  const { userID, otherUserID } = req.body;

  chatkit.createRoom({
    id: `room-${userID}-${otherUserID}`,
    creatorId: userID,
    name: 'Chat',
    isPrivate: true,
    userIds: [otherUserID],
  })
    .then(() => {
      res.json({
        roomID: `room-${userID}-${otherUserID}`
      })
    })
    .catch((err) => {
      console.log(err);
    });

});


//POST send new message to chatroom
app.post("/message", (req, res) => {
  const { userID, roomID, message } = req.body

  chatkit.sendSimpleMessage({
    userId: userID,
    roomId: roomID,
    text: message,
  })
    .then((res) => console.log('Sent message with ID: ', res.id))
    .catch((err) => console.error(err))

})



//DELETE room
app.delete("/room", (req, res) => {
  const { roomID } = req.body

  chatkit.asyncDeleteRoom({
    roomId: roomID
  })
    .then(() => console.log("Deleted chatroom"))
    .catch(err => console.error(err))

})




const PORT = 3000;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on ports ${PORT}`);
  }
});