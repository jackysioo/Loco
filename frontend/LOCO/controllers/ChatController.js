import React from "react";
import { StyleSheet, Text, View, Spinner } from "react-native";
import { ChatManager, TokenProvider } from "chatkit-client";


const instanceLocatorId = "v1:us1:0d19d6c4-7553-472b-8f65-3af90e0c9407";
const presenceRoomId = "74cfa57c-7c9c-492a-a7e4-0d7acfb23ad6"; 
const chatServer = "http://192.168.51.209:3000";

const tokenProvider = new TokenProvider({
    url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0d19d6c4-7553-472b-8f65-3af90e0c9407/token`
});

export default class ChatController extends React.Component {
    state = {
        userID: this.props.userID,
        currentRoomId: null,
        chatWithUser: null,
        chatWithUserIsTyping: false,
        refreshing: false,
        inChatRoom: false,
        nextLoadMessageID: null,
        visible: this.props.visible,
    };

    constructor(props) {
        super(props);
        this.currentUser = null;
        this.roomId = null;
    }


    getMessages(messages) {
        this.props.messages(messages)
    }

    getUsers() {
        fetch(chatServer + "/allrooms", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: this.state.userID,
            })
        })
        .then(res => {
            this.getMessages(res.messages)
            this.setState({
                nextLoadMessageID: res.nextMessageID
            })
        })
        .catch(error => {
            console.log(error);
        });
        
        this.props.users(users)
    }


    //load one-on-one chatroom of roomID
    enterChat = (roomID) => {
        this.setState({visible: true});

        //GET messages in room of roomID
        fetch(chatServer + "/messages", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomID: roomID,
                initialID: nextLoadMessageID
            })
        })
            .then(res => {
                this.getMessages(res.messages)
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
                    .then(currentUser => {
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


    updateMessage = message => {
        this.setState({
            message
        });
        this.currentUser.isTypingIn({ roomId: this.state.currentRoomId });
    };

    sendMessage = () => {
        if (this.state.message) {
            this.currentUser
                .sendMessage({
                    text: this.state.message,
                    roomId: this.state.currentRoomId
                })
                .then(messageId => {
                    this.setState({
                        message: ""
                    });
                })
                .catch(err => {
                    console.log(`error adding message to room: ${err}`);
                });
        }
    };

    render() {
        return <Spinner visible={this.state.visible} itemProp='size:100'/>
    }

}