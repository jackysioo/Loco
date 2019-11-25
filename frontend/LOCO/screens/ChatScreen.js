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
  RefreshControl,
  Dimensions
} from 'react-native';
import ChatController from '../controllers/ChatController';
import { Colors } from '../constants';
const { width, height } = Dimensions.get("screen");
const chatController = new ChatController()


export default class ChatScreen extends React.Component {
  state = {
    roomID: this.props.navigation.state.params.roomID,
    userID: this.props.navigation.state.params.userID,
    otherUserID: this.props.navigation.state.params.otherUserID,
    loadMessages: false,
    message: '',
    messages: [],
    chatWithUserIsTyping
  };

  componentDidMount() {
    chatController.loadChat(this.props.navigation.state.params.userID, this.props.navigation.state.params.roomID)
      .then((messages) => {
        this.setState({
          messages: messages
        }, () => {
          this.setState({
            loadMessages: true
          })
        })
      })
  }

  onReceiveMessage = (message) => {
    let isCurrentUser = this.state.userID == message.sender.id ? true : false;

    let messages = [...this.state.messages];
    messages.push({
      key: message.id.toString(),
      username: message.sender.name,
      message: message.text,
      datetime: message.createdAt,
      isCurrentUser
    });

    this.setState({ messages }, () => {
      this.scrollViewRef.scrollToEnd({ animated: true });
    }
    );
  };


  onUserTypes = (user) => {
    this.setState({
      chatWithUserIsTyping: true
    });
  };

  onUserNotTypes = user => {
    this.setState({
      chatWithUserIsTyping: false
    });
  };

  sendMessage = () => {
    if (this.state.message) {
      chatController
        .sendMessageToRoom(this.state.userID, this.state.roomID, this.state.message)
        .then(() => {
          this.setState({
            message: ""
          });
        })
        .catch(err => {
          console.log(`error adding message to room: ${err}`);
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
          <ScrollView
            ref={(ref) => {this.scrollViewRef = ref}}
            style={styles.messages}
            contentContainerStyle={styles.scroll_container}
          >
            {this.state.loadMessages && <FlatList
              data={this.state.messages}
              renderItem={this.renderItem} />}
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
              <TouchableOpacity >
                <View style={styles.send_button}>
                  <Text style={styles.send_button_text}>Send</Text>
                </View>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  renderItem = ({ item }) => {
    console.log(item)
    let box_style = item.isCurrentUser ? 'current_user_msg' : 'other_user_msg';
    let username_style = item.isCurrentUser
      ? 'current_user_username'
      : 'other_user_username';

    return (
      <View key={item.key} style={styles.msg}>
        <View style={styles.msg_wrapper}>
          <View style={styles.username}>
            <Text style={[styles.username_text, styles[username_style]]}>
              {item.username}
            </Text>
          </View>
          <View style={[styles.msg_body, styles[box_style]]}>
            <Text style={styles[`${box_style}_text`]}>{item.msg}</Text>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignSelf: 'stretch',
  },
  body: {
    flex: 9,
  },
  scroll_container: {
    paddingBottom: 20,
  },
  messages: {
    flex: 8,
    flexDirection: 'column',
    padding: 8,
  },
  current_user_msg: {
    backgroundColor: '#439bff',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  current_user_msg_text: {
    color: '#fff',
  },
  current_user_username: {
    opacity: 0,
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
  message_box: {
    flex: 0.1,
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    justifyContent: 'space-between',
  },
  username: {
    marginTop: 15,
  },
  username_text: {
    fontSize: 12,
    marginBottom: 2,
    marginLeft: 5,
  },
  msg_body: {
    flex: 10,
    padding: 8,
    borderRadius: 10,
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