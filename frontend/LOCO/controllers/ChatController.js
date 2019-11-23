import React from "react";
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import { withNavigation } from "react-navigation";
import { Images } from "../constants";

const instanceLocatorId = "v1:us1:0d19d6c4-7553-472b-8f65-3af90e0c9407";
const chatServer = "http://loco.eastus.cloudapp.azure.com:1337/chat";
const tokenProvider = new TokenProvider({
    url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0d19d6c4-7553-472b-8f65-3af90e0c9407/token'
});


class ChatController extends React.Component {

    // state = {
    //     userID: this.props.userID,
    //     nextLoadMessageID: null,
    //     chats: [],
    // };


    //check if a chatroom already exists between the current user and the other user
    //if chatroom does not exist, create a chatroom between current user and other user
    //if chatroom exists, load the chatroom between current user and other user
    chat = (otherUserID) => {
        var chatExists = false

        for (let chat of this.state.chats) {
            for (let userID of chat.userIDs) {
                if (otherUserID == userID) {
                    this.loadChat(chat.roomID)
                    chatExists = true
                }
            }
        }

        if (!chatExists) {
            this._createChat(otherUserID)
        }
    }


    //GET all of user's previous chatrooms
    getChats(userID) {
        console.log("fetching data of " + userID + " from: " + chatServer)
        return fetch(chatServer + "/chats?id=" + userID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((rooms) => {
                console.log("fetched data: " + room)
                var chats;
                for (let room of rooms) {
                    chats.push({
                        roomID: room.id,
                        userIDs: room.member_user_ids
                    })
                }
                return(chats)
            })
            .catch(error => {
                console.log(error);
            });
    }


    //retrieves all the messages of a chatroom
    loadChat = (roomID) => {
        this.setState({ visible: true });

        //GET messages in room of roomID
        return fetch(chatServer + "/messages?roomId=" + roomID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                //trigger callback of loaded messages
                this.setState({
                    nextLoadMessageID: res.nextMessageID
                })

                this.chatManager = new ChatManager({
                    instanceLocator: instanceLocatorId,
                    userId: this.state.userID,
                    tokenProvider
                });
                this.chatManager
                    .connect()
                    .then((currentUser) => {
                        currentUser
                            .subscribeToRoom({
                                roomId: roomID,
                            })
                            .catch(err => {
                                console.log(`Error joining room ${err}`);
                            });
                    })
                    .catch(error => {
                        console.log("error with chat manager", error);
                    });
                return(res.messages)
            })
            .catch(error => {
                console.log("error in request: ");
            });
    };


    //sends a message in the chatroom with roomID
    sendMessage(roomID, message) {
        fetch(chatServer + "/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: this.state.userID,
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


    _createChat(otherUserID) {
        return fetch(chatServer + "/room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: this.state.userID,
                otherUserID: otherUserID
            })
        })
            .then((res) => {
                if (res.ok) {
                    console.log("successfully created new room in controller")
                    return(res.roomID)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    //return loading animation when posting data
    render() {
        return (
            <View>
                { this.state.visible && <Image style={{width: 50, height: 50}} source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' }} />}
            </View>
        )
    }

}

export default (ChatController)