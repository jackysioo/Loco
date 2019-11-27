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
import chatController from '../controllers/ChatController';
const { width, height } = Dimensions.get("screen");


class MessagesScreen extends React.Component {
    state = {
        loading: true,
        refreshing: false,
    }

    constructor(props) {
        super(props)
        this.allChats = null
    }

    componentWillMount() {
        chatController.init()
        .then(() =>{
            chatController.getChats()
            .then((chats) => {
                console.log(chats)
                this.allChats = chats
                this.setState({
                    loading: false
                })

            })
        })
    }


    enterChat(roomID, otherUserID) {
        this.props.navigation.navigate('Chat', { roomID: roomID, otherUserID: otherUserID })
    }


    updateChatList = () => {
        this.setState({
            refreshing: true
        });
        chatController.getChats()
            .then((chats) => {
                this.allChats = chats
                this.setState({
                    refreshing: false
                })
            })
    }

    loadingAnimation() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#51bfbb" />
            </View>
        )
    }

    renderChats() {
        return this.allChats.map((chat) => {
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
            <View style={{ flex: 1 }}>

                <View style={styles.header}>
                    <HeadingText1 style={styles.headerTitle}> MESSAGES</HeadingText1>
                </View>
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
            </View>
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
        width: width,
        backgroundColor: Colors.primary,
        paddingVertical: 15,
    },
    headerTitle: {
        fontSize: 25,
        marginTop: 10,
        letterSpacing: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        color: Colors.white,
    },
    loading: {
        position: "absolute",
        top: height*0.45,
        left: width*0.45,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatItemContainer: {
        marginTop: 15,
        width: width,
        height: 100,
    },
    chatItem: {
        margin: 5,
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
        backgroundColor: Colors.placeholder,
        opacity: 0.5
    },
    message: {
        fontSize: 15,
        color: Colors.secondary,
        marginHorizontal: 25,
        marginVertical: 5,
        width: width*0.6

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