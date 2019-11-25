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


class LOCOChatManager extends React.Component {
    state = {
        roomID: this.props.roomID,
        userID: this.props.userID,
        otherUserID: this.props.otherUserID,
    }

    constructor(props) {
        super(props);
        this.currentUser = null;
    }

    refresh(oldestMessageId) {
        this.currentUser
            .fetchMessages({
                roomId: this.state.roomID,
                initialId: oldestMessageId,
                direction: "older",
                limit: 5
            })
            .then((messages) => {
                this.props.loadPreviousMessages(messages)
            })
    }


    subscribe() {
        this.chatManager = new ChatManager({
            instanceLocator: instanceLocatorId,
            userId: this.state.userID,
            tokenProvider
        });
        this.chatManager
            .connect()
            .then((currentUser) => {
                this.currentUser = currentUser;
                currentUser.subscribeToRoom({
                    roomId: this.state.roomID,
                    hooks: {
                        onMessage: this.props.onReceiveMessage,
                        onUserStartedTyping: this.props.onUserTypes,
                        onUserStoppedTyping: this.props.onUserNotTypes
                    }
                })
                    .catch(err => {
                        console.log(`Error joining room ${err}`);
                    });
            })
            .catch(error => {
                console.log("error with chat manager", error);
            });
    }

    //return loading animation when posting data
    render() {
        return (
            <View>
            </View>
        )
    }

}


export default (LOCOChatManager)