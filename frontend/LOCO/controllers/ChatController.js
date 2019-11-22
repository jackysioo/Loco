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
const chatServer = "http://192.168.51.209:3000";
const tokenProvider = new TokenProvider({
    url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0d19d6c4-7553-472b-8f65-3af90e0c9407/token`
});


class ChatController extends React.Component {
    state = {
        userID: this.props.userID,
        nextLoadMessageID: null,
        chats: [],
        visible: this.props.visible,
    };

    constructor(props) {
        super(props);
        this.currentUser = null;
    }

    componentDidMount() {
        this._getChats()
    }


    //return chats to messages screen
    getChats = () => {
        this.props.chats(this.state.chats)
    }


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


    //retrieves all the messages of a chatroom
    loadChat = (roomID) => {
        this.setState({ visible: true });

        //GET messages in room of roomID
        fetch(chatServer + "/messages?roomId=" + roomID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                //trigger callback of loaded messages
                this.props.messages(res.messages)
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
        fetch(chatServer + "/room", {
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
                    this.props.newRoomID(res.roomID)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }



    //GET all of user's previous chatrooms
    _getChats() {

        fetch(chatServer + "/chats?id=" + this.state.userID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((rooms) => {
                console.log("fetched data: " + room)
                for (let room of rooms) {
                    this.state.chats.push({
                        roomID: room.id,
                        userIDs: room.member_user_ids
                    })
                }
            })
            .catch(error => {
                console.log(error);
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

export default withNavigation(ChatController)