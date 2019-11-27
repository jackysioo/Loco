import React from "react";
import {
    View,
} from 'react-native';
import userCache from '../caches/UserCache'

const searchServer = "http://loco.eastus.cloudapp.azure.com:1337/business"

class SearchController extends React.Component {
    
    constructor(props) {
        super(props);
        this.userID = null
        this.userToken = null
    }


    async init() {
        try {
            const userID = await userCache.getUserID()
            const user = await userCache.getData(userID)
            this.userID = userID
            this.userToken = user.token
        }
        catch (error) {
            console.log(error);
        }
    }

    async search(input, location, sort) {
        try {
            const response = await fetch(searchServer + "/get?title=" + input + "&lat=" + location.lat + "&long=" + location.long, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                }
            })
            const data = await response.json();
            return data.businesses;
        }
        catch (error) {
            return console.log(error);
        }
    }


    render() {
        return (
            <View>
            </View>
        )
    }
}


const searchController = new SearchController()
export default (searchController)