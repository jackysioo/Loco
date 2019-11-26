import React from "react";
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import userCache from '../caches/UserCache'
const chatServer = "http://loco.eastus.cloudapp.azure.com:1337/chat";


class ChatController extends React.Component {

    constructor(props) {
        super(props);
        this.userID = null
    }

    async init() {
        try {
            const userID = await userCache.getUserID()
            this.userID = userID
        }
        catch (error) {
            console.log(error);
        }
    }

    //check if a chatroom already exists between the current user and the other user
    //if chatroom does not exist, create a chatroom between current user and other user
    //if chatroom exists, load the chatroom between current user and other user
    sendMessageToUser(otherUserID, message) {
        var chatExists = false

        fetch(chatServer + "/messages?id=" + this.userID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((rooms) => {
                for (let room of rooms) {
                    for (let id of room.member_user_ids) {
                        if (otherUserID === id) {
                            chatExists = true
                            console.log("sending " + message + " to " + otherUserID)
                            this.sendMessageToRoom(room.id, message)
                                .then((res) => {
                                    console.log("response :" + res)
                                    return res
                                })
                        }
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });

        if (!chatExists) {
            this._createChat(otherUserID)
                .then((roomID) => {
                    console.log("sending " + message + " to " + otherUserID)
                    this.sendMessageToRoom(roomID, message)
                    .then((res) => {
                        console.log("response :" + res)
                        return res
                    })
                })
        }
    }


    //GET all of user's previous chatrooms
    async getChats() {
        try {
            const response = await fetch(chatServer + "/chats?id=" + this.userID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const rooms = await response.json();
            var chats = [];
            for (let room of rooms) {
                for (let id of room.member_user_ids) {
                    if (id !== this.userID) {
                        // const username = await this.getUser(id)
                        const message = await this._getLatestMessage(room.id)
                        chats.push({
                            roomID: room.id,
                            otherUserID: id,
                            // otherUsername: username.name,
                            latestMessage: message.message,
                            latestMessageTimeStamp: message.timestamp
                        })
                    }
                }
            }
            return (chats);
        }
        catch (error) {
            console.log(error);
        }
    }


    //GET user's data
    async getUser() {
        try {
            const response = await fetch(chatServer + "/users?id=" + userID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const user = await response.json();
            return (user);
        }
        catch (error) {
            console.log(error);
        }
    }


    //GET user's data
    async createUser(id, name) {
        try {
            const response = await fetch(chatServer + "/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: id,
                    name: name
                })
            });
            if (response.ok) {
                console.log("successfully created new user for chat");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //retrieves all the messages of a chatroom
    async loadChat(roomID) {
        //GET messages in room of roomID
        try {
            const res = await fetch(chatServer + "/messages?roomId=" + roomID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const messages = await res.json();
            console.log(messages)
            return (messages);
        }
        catch (error) {
            console.log("error in request: ");
        }
    };


    //sends a message in the chatroom with roomID
    sendMessageToRoom(roomID, message) {
        fetch(chatServer + "/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: this.userID,
                roomID: roomID,
                message: message
            })
        })
            .then((res) => {
                if (res.ok) {
                    return 200
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }


    async _createChat(otherUserID) {
        try {
            const res = await fetch(chatServer + "/room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: this.userID,
                    otherUserID: otherUserID
                })
            });
            if (res.ok) {
                console.log("successfully created new room in controller");
                return(res.roomID);
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    async _getLatestMessage(roomID) {
        try {
            const res = await fetch(chatServer + "/messages?roomId=" + roomID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const messages = await res.json();
            if (messages.length > 0) {
                return ({
                    message: messages[0].parts[0].content,
                    timestamp: messages[0].created_at
                    }
                )
            } else {
                return ({
                    message: '',
                    timestamp: 'Send your first message.....'
                    }
                )
            }
        }
        catch (error) {
            console.log("error in request: ");
        }
    }


    //return loading animation when posting data
    render() {
        return (
            <View></View>
        )
    }

}

export default (ChatController)