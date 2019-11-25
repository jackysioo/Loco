import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Keyboard,
  RefreshControl
} from 'react-native';
import ChatController from '../controllers/ChatController';
import { Colors } from '../constants';
import { HeadingText1 } from '../components/Texts';
import LOCOChatManager from '../controllers/LOCOChatManager';
const { width, height } = Dimensions.get("screen");
const chatController = new ChatController()


export default class ChatScreen extends React.Component {
  state = {
    roomID: this.props.navigation.state.params.roomID,
    userID: this.props.navigation.state.params.userID,
    otherUserID: this.props.navigation.state.params.otherUserID,
    message: '',
    messages: [],
    chatWithUserIsTyping: false,
    refreshing: false,
  };

  componentDidMount() {
    this.chatRef.subscribe() 
    this.scrollViewRef.scrollToEnd({ animated: true })

    // chatController.loadChat(this.props.navigation.state.params.roomID)
    //   .then((messages) => {
    //     let messageList = [...this.state.messages];
    //     for (let message of messages) {
    //       for (let text of message.parts) {
    //         if (text.type === "text/plain") {
    //           let isCurrentUser = message.user_id == this.state.userID ? true : false
    //           messageList.push({
    //             key: message.id.toString(),
    //             userID: message.user_id,
    //             message: text.content,
    //             timestamp: message.created_at,
    //             isCurrentUser
    //           })
    //         }
    //       }
    //     }
    //     this.setState({
    //       messages: messageList
    //     }, () => {
    //       this.setState({
    //         loadMessages: true
    //       })
    //     })
    //   })
  }

  onReceiveMessage = (message) => {
    let isCurrentUser = this.state.userID == message.sender.id ? true : false;

    let messages = [...this.state.messages];
    messages.push({
      key: message.id.toString(),
      username: message.sender.name,
      message: message.text,
      timestamp: message.createdAt,
      isCurrentUser
    });

    this.setState({ messages }, () => {
      this.scrollViewRef.scrollToEnd({ animated: true })
    });

  };


  refresh = () => {
    const oldestMessageId = Math.min(
        ...this.state.messages.map(m => parseInt(m.key))
    );
    this.setState({
        refreshing: true
    });
    this.chatRef.refresh(oldestMessageId)
  }


  loadPreviousMessages = (messages) => {
        let currentMessages = [...this.state.messages];
        let old_messages = [];

        messages.forEach((msg) => {
          let isCurrentUser =
            this.state.userID == msg.sender.id ? true : false;

          old_messages.push({
            key: msg.id.toString(),
            username: msg.sender.name,
            message: msg.text,
            timestamp: msg.createdAt,
            isCurrentUser
          });
        });

        currentMessages = old_messages.concat(currentMessages);

        this.setState({
          refreshing: false,
          messages: currentMessages
        });
  };

  onUserTypes = (user) => {
    this.setState({
      chatWithUserIsTyping: true
    });
  };

  onUserNotTypes = (user) => {
    this.setState({
      chatWithUserIsTyping: false
    });
  };

  sendMessage = async () => {
    if (this.state.message) {
      Keyboard.dismiss()
      await chatController
        .sendMessageToRoom(this.state.userID, this.state.roomID, this.state.message)
      this.setState({
        message: ""
      });
    }
  };

  updateMessage = (message) => {
    this.setState({
      message
    })
  }

  render() {

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <View style={styles.body}>
          <HeadingText1 style={styles.header}>{this.state.otherUserID}</HeadingText1>
          <ScrollView
            ref={(ref) => { this.scrollViewRef = ref }}
            style={styles.messages}
            // onContentSizeChange={(contentWidth, contentHeight)=>{        
            //     this.scrollViewRef.scrollToEnd({animated: true})}}
            contentContainerStyle={styles.scroll_container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refresh}
              />}
          >
          <FlatList
              data={this.state.messages}
              renderItem={this.renderItem} />
          </ScrollView>

          {this.chatWithUserIsTyping && (
            <View style={styles.typing_indicator}>
              <Text style={styles.typing_indicator_text}>
                {this.state.otherUserID} is typing...
              </Text>
            </View>
          )}

          <View style={styles.message_box}>
            <TextInput
              style={styles.text_field}
              multiline={true}
              onChangeText={this.updateMessage}
              value={this.state.message}
              placeholder="Type your message..."
            />

            <View style={styles.button_container}>
              <TouchableOpacity onPress={this.sendMessage}>
                <View style={styles.send_button}>
                  <Text style={styles.send_button_text}>Send</Text>
                </View>
              </TouchableOpacity>

            </View>
          </View>
        </View>
        <LOCOChatManager 
          ref={(ref) => { this.chatRef = ref }}
          userID = {this.state.userID} 
          roomID = {this.state.roomID}
          otherUserID = {this.state.otherUserID} 
          onReceiveMessage = {this.onReceiveMessage}
          onUserTypes = {this.onUserTypes}
          onUserNotTypes = {this.onUserNotTypes}
          loadPreviousMessages = {this.loadPreviousMessages}
          />
      </KeyboardAvoidingView>
    );
  }

  renderItem = ({ item }) => {
    let box_style = item.isCurrentUser ? 'current_user_msg' : 'other_user_msg';
    let username_style = item.isCurrentUser
      ? 'current_user_username'
      : 'other_user_username';
    let datestamp_style = item.isCurrentUser
      ? 'current_user_datestamp'
      : 'other_user_datestamp';

    return (
      <View key={item.key} style={styles.msg}>
        <View style={styles.msg_wrapper}>
          <View style={styles.username}>
            <Text style={[styles.username_text, styles[username_style]]}>
              {item.userID}
            </Text>
          </View>
          <View style={[styles.msg_body, styles[box_style]]}>
            <Text style={styles[`${box_style}_text`]}>{item.message}</Text>
          </View>
          <Text style={styles[datestamp_style]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
  },
  body: {
    flex: 9,
    width: width,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
  },
  header: {
    color: Colors.primary,
    alignSelf: 'center',
    letterSpacing: 2,
    marginTop: 40,
    fontSize: 18,
  },
  scroll_container: {
    paddingBottom: 50,
  },
  messages: {
    flex: 8,
    flexDirection: 'column',
    padding: 30,
  },
  current_user_msg: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  current_user_msg_text: {
    color: '#fff',
  },
  current_user_username: {
    color: Colors.primary,
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  current_user_datestamp: {
    color: Colors.placeholder,
    marginTop: 5,
    fontSize: 8,
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  other_user_msg: {
    backgroundColor: '#f6f8fa',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  other_user_msg_text: {
    color: '#333',
  },
  other_user_username: {
    color: '#484848',
  },
  other_user_datestamp: {
    color: Colors.placeholder,
    marginTop: 5,
    fontSize: 8,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  message_box: {
    flex: 0.1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    justifyContent: 'space-between',
  },
  username: {
    marginTop: 15,
  },
  username_text: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: 5,
  },
  msg_body: {
    flex: 10,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    maxWidth: 250,
  },
  typing_indicator: {
    padding: 5,
  },
  typing_indicator_text: {
    fontSize: 10,
    color: '#ccc',
  },
  text_field: {
    height: 40,
    flex: 8,
  },
  button_container: {
    flex: 2,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  send_button_text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});