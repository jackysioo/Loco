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

    async storeData(key, data) {
        try {
            await AsyncStorage.setItem(key + "-user", data);
        } catch (error) {
            console.log(error)
        }
    };

    async getData(userID) {
        try {
            const value = await AsyncStorage.getItem(userID + "-user");
            if (value !== null) {
              return (JSON.parse(value))
            }
          } catch (error) {
            console.log(error)
          }
    };


    async removeData(key) {
        try {
            await AsyncStorage.removeItem(key + "-user")
          } catch (error) {
            console.log(error)
          }
    }

    async clear() {
        try {
            await AsyncStorage.clear()
          } catch (error) {
            console.log(error)
          }
    }

    render() {
        return (
            <View>
            </View>
        )
    }
}

const userCache = new UserCache()
export default (userCache)