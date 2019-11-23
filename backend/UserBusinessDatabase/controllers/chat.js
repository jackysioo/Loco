
const Chatkit = require("@pusher/chatkit-server");

const instance_locator_id = "v1:us1:0d19d6c4-7553-472b-8f65-3af90e0c9407";
const chatkit_secret = "4ed3e048-d5fe-4872-96bc-dac27927a3c7:63sb/WHWfDrL3TPGwImk2MS1xdtfXZlIjLQJ+HRom5s=";

const chatkit = new Chatkit.default({
  instanceLocator: instance_locator_id,
  key: chatkit_secret
});


exports.getMain = (req, res) => {
  res.send("all green!");
};

//GET list of chatrooms the current user has chatted with
exports.getChats = (req, res) => {
  console.log("fetching data from: " + req.query.id)

  chatkit.getUserRooms({
    userId: req.query.id,
  })
    .then((chatrooms) => {
      res.json(chatrooms)
    })
    .catch(err => console.error(err))
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
          if (id != req.query.id) {
            userIDs.push(id)
          }
        }
      }
      res.json(userIDs)
    })
    .catch(err => console.error(err))
};



//GET array of messages of current chatroom history and the messageID of the next message to be loaded
//if it's the first time retrieving messages, get messages from chatkit without initial meessage ID
exports.getMessages = (req, res) => {
  console.log("fetching messages from room: " + req.query.roomId)
  var messageList = []

    chatkit.fetchMultipartMessages({
      roomId: req.query.roomId,
    })
      .then((messages) => {
        for (let m of messages) {
          for (let message of m.parts) {
            if (message.type == "text/plain") {
              messageList.push({
                userID: m.userId,
                message: message.content
              })
            }
          }
        }
        res.json(messageList)
      })
      .catch(err => console.error(err))
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
    .catch(err => console.error(err))

}



