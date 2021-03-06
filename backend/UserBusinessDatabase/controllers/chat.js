
const Chatkit = require("@pusher/chatkit-server");

const instanceLocatorId = "v1:us1:0d19d6c4-7553-472b-8f65-3af90e0c9407";
const chatkitSecret = "4ed3e048-d5fe-4872-96bc-dac27927a3c7:63sb/WHWfDrL3TPGwImk2MS1xdtfXZlIjLQJ+HRom5s=";

const chatkit = new Chatkit.default({
  instanceLocator: instanceLocatorId,
  key: chatkitSecret
});


//GET list of chatrooms the current user has chatted with
exports.getChats = (req, res) => {
  console.log("fetching data from: " + req.query.id)

  chatkit.getUserRooms({
    userId: req.query.id,
  })
    .then((chatrooms) => {
      res.json(chatrooms)
    })
    .catch((err) => console.error(err))
};


//GET user data
exports.getUser = (req, res) => {
  console.log("fetching user data from: " + req.query.id)
  chatkit.getUser({
    userId: req.query.id,
  })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => console.error(err))
};


//GET list of all the userIDs of users the current user has chated with
exports.getUsers = (req, res) => {
  console.log("fetching data from: " + req.query.id)
  var userIDs = []

  chatkit.getUserRooms({
    userId: req.query.id,
  })
    .then((rooms) => {
      for (let room of rooms) {
        for (let id of room.member_user_ids) {
          if (id !== req.query.id) {
            userIDs.push(id)
          }
        }
      }
      res.json(userIDs)
    })
    .catch((err) => console.error(err))
};



//POST create new user 
exports.postUser = (req, res) => {
  const { userID, name } = req.body;

  chatkit.createUser({
    id: userID,
    name: name,
  })
    .then(() => {
      console.log('User created successfully')
    })
    .catch((err) => {
      console.log(err);
    });

};


//GET array of messages of current chatroom history and the messageID of the next message to be loaded
//if it's the first time retrieving messages, get messages from chatkit without initial meessage ID
exports.getMessages = (req, res) => {
  console.log("fetching messages from room: " + req.query.roomId)
    chatkit.fetchMultipartMessages({
      roomId: req.query.roomId,
      direction: "older",
      limit: 5
    })
      .then((messages) => {
        res.json(messages)
      })
      .catch((err) => console.error(err))
  };


//POST create new room with current userID and other userID
exports.postRoom = (req, res) => {
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

};


//POST send new message to chatroom
exports.postMessages = (req, res) => {
  const { userID, roomID, message } = req.body

  chatkit.sendSimpleMessage({
    userId: userID,
    roomId: roomID,
    text: message,
  })
    .then(() => res.send(200))
    .catch((err) => console.error(err))

}



//DELETE room
exports.deleteRoom = (req, res) => {
  const { roomID } = req.body

  chatkit.asyncDeleteRoom({
    roomId: roomID
  })
    .then(() => res.send(200))
    .catch((err) => console.error(err))

}



