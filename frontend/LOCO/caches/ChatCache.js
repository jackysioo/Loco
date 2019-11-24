import React from "react";
import { View, AsyncStorage } from 'react-native';

class ChatCache extends React.Component {

    async storeData(userID, chats) {
        try {
            await AsyncStorage.setItem(userID, chats);
        } catch (error) {
            console.log(error)
        }
    };

    async getData(userID) {
        try {
            const value = await AsyncStorage.getItem(userID);
            if (value !== null) {
              return (value)
            }
          } catch (error) {
            console.log(error)
          }
    };

    render() {
        return (
            <View>
            </View>
        )
    }
}


export default (ChatCache)