import React from "react";
import { View, AsyncStorage } from 'react-native';

class UserCache extends React.Component {

    async getUserID() {
        try {
            const value = await AsyncStorage.getItem("userID");
              return (value)
          } catch (error) {
            console.log(error)
          }
    };

    async storeUserID(userID) {
        try {
            await AsyncStorage.setItem("userID", userID);
        } catch (error) {
            console.log(error)
        }
    };

    async storeData(userID, chats) {
        try {
            await AsyncStorage.setItem(userID + "-user", chats);
        } catch (error) {
            console.log(error)
        }
    };

    async getData(userID) {
        try {
            const value = await AsyncStorage.getItem(userID + "-user");
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

const userCache = new UserCache()
export default (userCache)