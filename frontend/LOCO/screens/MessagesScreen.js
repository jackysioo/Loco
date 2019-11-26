import React from 'react';
import { withNavigation } from 'react-navigation';
import {
    Dimensions,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    Modal
} from 'react-native';
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
import ChatController from '../controllers/ChatController';
const { width, height } = Dimensions.get("screen");
const chatController = new ChatController()


class MessagesScreen extends React.Component {
    state = {
        allChats: [],
        loading: true,
        refreshing: false,
    }

    componentDidMount() {
        chatController.init().then(()=>{
            chatController.getChats()
                .then((chats) => {
                    this.setState({
                        allChats: chats
                    }, () => {
                        this.setState({
                            loading: false
                        })
                    })
                })
        })
    }


    enterChat(roomID, otherUserID) {
        this.props.navigation.navigate('Chat', { roomID: roomID, otherUserID: otherUserID })
    }

    newRoomID = (roomID) => {

    }

    updateChatList = () => {
        this.setState({
            refreshing: true
        });
        chatController.getChats()
            .then((chats) => {
                this.setState({
                    allChats: chats
                }, () => {
                    this.setState({
                        refreshing: false
                    })
                })
            })
    }

    loadingAnimation() {
        return(
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#51bfbb" />
            </View>
        )
    }

    renderChats() {
        return this.state.allChats.map((chat) => {
            return (
                <View style={styles.chatItemContainer} key={chat.roomID}>
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={() => this.enterChat(chat.roomID, chat.otherUserID)}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' }} />
                        <View styles={{ flexDirection: 'column' }}>
                            <HeadingText1 style={styles.username}> {chat.otherUserID} </HeadingText1>
                            <Text numberOfLines={1} style={styles.message}> {chat.latestMessage}</Text>
                            <Text style={styles.timestamp}> {chat.latestMessageTimeStamp}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.messagesDivideLine}></View>
                </View>
            )
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeadingText1 style={styles.header}>MESSAGES</HeadingText1>
                {this.state.loading && this.loadingAnimation()}
                <ScrollView style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.updateChatList}
                        />}
                >
                    {!this.state.loading && this.renderChats()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },
    header: {
        color: Colors.primary,
        alignSelf: 'center',
        letterSpacing: 1,
        margin: 20,
        fontSize: 25,
    },
    loading: {
        position: "absolute",
        top: height/2,
        left: width/2,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatItemContainer: {
        width: width,
        height: 100,
    },
    chatItem: {
        margin: 10,
        flexDirection: 'row',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },
    messagesDivideLine: {
        marginHorizontal: 25,
        marginTop: 5,
        height: 0.5,
        backgroundColor: Colors.placeholder
    },
    message: {
        fontSize: 15,
        color: Colors.secondary,
        marginHorizontal: 25,
        marginVertical: 5
    },
    timestamp: {
        fontSize: 10,
        color: Colors.placeholder,
        marginHorizontal: 25,
        marginVertical: 5
    },
    username: {
        color: Colors.primary,
        fontSize: 18,
        letterSpacing: 1,
        marginHorizontal: 23
    }
})

export default withNavigation(MessagesScreen);