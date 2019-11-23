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
import  ChatController from '../controllers/ChatController';
const { width, height } = Dimensions.get("screen");
const chatController = new ChatController(userID)


class MessagesScreen extends React.Component {
    state = {
        allChats: []
    }

    componentDidMount() {
        chatController.getChats()
            .then((messages) => {
                this.setState({
                    allChats: [...messages]
                })
            })
    }

    enterChat = (roomID) => {
        navigation.navigate('Chat', { controller: chatController, roomID: roomID })
    }

    newRoomID = (roomID) =>{

    }

    renderChats() {
        return this.state.allChats.map((chat) => {
            return (
                <View style={styles.chatItemContainer} key={chat.roomID}>
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={this.enterChat(roomID)}>
                        <Image 
                            style={styles.avatar} 
                            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' }} />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    render() {
        const { userID } = this.props;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    {this.renderChats()}
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
    chatItemContainer: {
        width: width,
        height: 150,
        borderColor: Colors.placeholder,
        borderWidth: 1,
        backgroundColor: Colors.primary
    },
    chatItem: {
        margin: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
})

export default withNavigation(MessagesScreen);