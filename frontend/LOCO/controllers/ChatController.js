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
        this.chatExists = null
        this.allChats = null,
        this.userToken = null
    }

    async init() {
        try {
            const userID = await userCache.getUserID()
            const user = await userCache.getData(userID)
            this.userID = userID
            this.userToken = user.token
        }
        catch (error) {
            console.log(error);
        }
    }

    //check if a chatroom already exists between the current user and the other user
    //if chatroom does not exist, create a chatroom between current user and other user
    //if chatroom exists, load the chatroom between current user and other user
    async sendMessageToUser(otherUserID, message) {
        // this.chatExists = false
        try {
            const response = await fetch(chatServer + "/chats?id=" + this.userID, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                }
            })

            // const rooms = await response.json()
            // for (let room of rooms) {
            //     for (let id of room.member_user_ids) {
            //         if (otherUserID === id) {
            //             const res = await this.sendMessageToRoom(room.id, message)
            //             return res
            //         }
            //     }
            // }

            for (let chat of this.allChats) {
                if (chat.otherUserID === otherUserID) {
                    const res = await this.sendMessageToRoom(chat.roomID, message)
                    return res
                }
            }

            const roomID = await this._createChat(otherUserID)
            console.log(roomID)
            if (roomID !== 404) {
                const res = await this.sendMessageToRoom(roomID, message)
                return res
            } else {
                return 404
            }

        }
        catch (error) {
            console.log(error);
        }


    }


    //GET all of user's previous chatrooms
    async getChats() {
        try {
            const response = await fetch(chatServer + "/chats?id=" + this.userID, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                }
            });
            console.log(response)
            const rooms = await response.json();
            //add admin support chat to all users
            const supportMsg = await this._getLatestMessage("d218554c-4dec-4475-8f84-eac7216e020a")
            var chats = [{
                roomID: "d218554c-4dec-4475-8f84-eac7216e020a",
                otherUserID: "Admin",
                latestMessage: supportMsg.message,
                latestMessageTimeStamp: supportMsg.timestamp
            }];

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
            this.allChats = chats
            return (chats);
        }
        catch (error) {
            console.log(error);
        }
    }


    //GET user's data
    async getUser() {
        try {
            const response = await fetch(chatServer + "/users?id=" + this.userID, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
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
        console.log("creating user in chat: " + id + " " + name)
        try {
            const response = await fetch(chatServer + "/users", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
                body: JSON.stringify({
                    userID: id,
                    name: name
                })
            });
            console.log(response)
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
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
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
    async sendMessageToRoom(roomID, message) {
        try {
            const res = await fetch(chatServer + "/messages", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
                body: JSON.stringify({
                    userID: this.userID,
                    roomID: roomID,
                    message: message
                })
            })
            if (res.ok) {
                return 200
            }
        }
        catch (err) {
            console.log(err)
        }

    }


    async _createChat(otherUserID) {
        try {
            const res = fetch(chatServer + "/room", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
                body: JSON.stringify({
                    userID: this.userID,
                    otherUserID: otherUserID
                })
            });
            console.log(res)
            if (res.ok) {
                console.log("successfully created new room in controller");
                return ("room-" + this.userID + "-" + otherUserID);
            } else {
                return 404
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
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
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


const chatController = new ChatController()
export default (chatController)