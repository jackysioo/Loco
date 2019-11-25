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
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native';
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
import ChatController from '../controllers/ChatController';
const { width, height } = Dimensions.get("screen");
const chatController = new ChatController()


class MessagesScreen extends React.Component {
    state = {
        userID: "Cynthia",
        allChats: [],
        loadChats: false
    }

    componentDidMount() {
        chatController.getChats(this.state.userID)
            .then((chats) => {
                this.setState({
                    allChats: chats
                }, () => {
                    this.setState({
                        loadChats: true
                    })
                })
            })
    }


    enterChat(roomID) {
        this.props.navigation.navigate('Chat', { userID: this.state.userID, roomID: roomID })
    }

    newRoomID = (roomID) => {

    }

    renderChats() {
        return this.state.allChats.map((chat) => {
            return (
                <View style={styles.chatItemContainer} key={chat.roomID}>
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={() => this.enterChat(chat.roomID)}>
                            <Image
                            style={styles.avatar}
                            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' }} />
                            <HeadingText1 style={styles.username}> {chat.otherUserID} </HeadingText1>

                    </TouchableOpacity>
                </View>
            )
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeadingText1 style={styles.header}>MESSAGES</HeadingText1>
                <ScrollView style={styles.container}>
                    {this.state.loadChats && this.renderChats()}
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
    header :{
        color: Colors.primary,
        alignSelf: 'center',
        letterSpacing: 2,
        margin: 20,
        fontSize: 20,
    },
    chatItemContainer: {
        width: width,
        height: 100,
        borderColor: Colors.placeholder,
        borderWidth: 1,
    },
    chatItem: {
        margin: 10,
        flexDirection: 'row',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'

    },
    username: {
        color: Colors.primary,
        fontSize: 18,
        marginHorizontal: 10,
        marginVertical: 5,
        letterSpacing: 1
    }
})

export default withNavigation(MessagesScreen);