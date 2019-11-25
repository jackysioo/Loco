import React from "react";
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

const instanceLocatorId = "v1:us1:0d19d6c4-7553-472b-8f65-3af90e0c9407";
const chatServer = "http://loco.eastus.cloudapp.azure.com:1337/chat";
const tokenProvider = new TokenProvider({
    url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0d19d6c4-7553-472b-8f65-3af90e0c9407/token'
});


class ChatController extends React.Component {

    //check if a chatroom already exists between the current user and the other user
    //if chatroom does not exist, create a chatroom between current user and other user
    //if chatroom exists, load the chatroom between current user and other user
    sendMessageToUser(userID, otherUserID) {
        var chatExists = false

        fetch(chatServer + "/chats?id=" + userID, {
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
                            this.loadChat(room.id)
                        }
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });

        if (!chatExists) {
            this._createChat(otherUserID)
        }
    }


    //GET all of user's previous chatrooms
    async getChats(userID) {
        try {
            const response = await fetch(chatServer + "/chats?id=" + userID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const rooms = await response.json();
            var chats = [];
            for (let room of rooms) {
                for (let id of room.member_user_ids) {
                    if (id !== userID) {
                        const username = await this.getUser(id)
                        chats.push({
                            roomID: room.id,
                            otherUserID: id,
                            otherUsername: username.name
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
    async getUser(userID) {
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
    async createUser(userID, name) {
        try {
            const response = await fetch(chatServer + "/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: userID,
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
    async loadChat(userID, roomID) {
        //GET messages in room of roomID
        try {
            const res = await fetch(chatServer + "/messages?roomId=" + roomID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            this.chatManager = new ChatManager({
                instanceLocator: instanceLocatorId,
                userId: userID,
                tokenProvider
            });
            this.chatManager
                .connect()
                .then((currentUser) => {
                    currentUser.subscribeToRoom({
                        roomId: roomID,
                        hooks: {
                          onMessage: this.onReceiveMessage,
                          onUserStartedTyping: this.onUserTypes,
                          onUserStoppedTyping: this.onUserNotTypes
                        }
                    })
                        .catch(err => {
                            console.log(`Error joining room ${err}`);
                        });
                })
                .catch(error => {
                    console.log("error with chat manager", error);
                });
            
            const messages = await res.json();
            console.log(messages)
            // for (let m of messages) {
            //     for (let message of m.parts) {
            //       if (message.type === "text/plain") {
            //         messageList.push({
            //             id: 
            //           userID: m.userId,
            //           message: message.content
            //         })
            //       }
            //     }
            //   }
            return (messages);
        }
        catch (error) {
            console.log("error in request: ");
        }
    };


    //sends a message in the chatroom with roomID
    sendMessageToRoom(userID, roomID, message) {
        fetch(chatServer + "/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: userID,
                roomID: roomID,
                message: message
            })
        })
            .then((res) => {
                if (res.ok) {
                    console.log("successfully sent message in controller")
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
                    userID: this.state.userID,
                    otherUserID: otherUserID
                })
            });
            if (res.ok) {
                console.log("successfully created new room in controller");
                this.loadChat(res.roomID);
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    //return loading animation when posting data
    render() {
        return (
            <View>
                {this.state.visible && <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' }} />}
            </View>
        )
    }

}

export default (ChatController)