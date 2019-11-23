import React from "react";
import {
    View,
} from 'react-native';

const searchServer = "http://loco.eastus.cloudapp.azure.com:1337/business"

class SearchController extends React.Component {

    async search(searchInput, location) {
        
        try {
            const response = await fetch(searchServer + "/get?title=" + searchInput + "&lat=" + location.lat + "&long=" + location.long)
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