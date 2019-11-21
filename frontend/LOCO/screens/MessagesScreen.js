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
import { Images, user, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
import ChatController from '../controllers/ChatController';
const { width, height } = Dimensions.get("screen");


class MessagesScreen extends React.Component {
    state = {
        allChats: []
    }

    loadChats = (chats) => {
        this.setState({
            allChats: [...chats]
        })
    }

    enterChat = (roomID) => {
        navigation.navigate('Chat', { controller: this.chatController, roomID: roomID})
    }

    renderChats() {
        const { navigation } = this.props

        return this.state.allChats.map((chat) => {
            return (
                <View style={styles.chatItemContainer} key={chat.roomID}>
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={this.enterChat(roomID)}>
                            <Image style={styles.avatar} source={{ uri: Images.Logo }}/>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    render() {
        const { userID } = this.props;

        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {this.renderChats()}
            </ScrollView>
            <ChatController
                ref={(input) => this.chatController = input}
                visible={false}
                userID={userID}
                chats={this.loadChats}
                messages={this.loadMessages}
                newRoomID={this.newRoomID}
            />
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },
    chatItemContainer : {
        width: width,
        height: 150,
        borderColor: Colors.placeholder,
        borderWidth: 1,
    },
    chatItem : {
        margin: 10
    }, 
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
})

export default withNavigation(MessagesScreen);