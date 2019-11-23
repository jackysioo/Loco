import React from "react";
import {
    View,
} from 'react-native';

const googleMapsServer = "https://maps.googleapis.com/maps/api"
const key = "AIzaSyAUmi1W1FT2s1UGYlGtWuaSWe2GoPbESD0"

class MapController extends React.Component {

    async geocodeFromAddress(streetNum, street, city) {
        try {
            const response = await fetch(googleMapsServer + "/geocode/json?address=" + streetNum + "+" + street + ",+" + city + ",+Canada&key=" + key, {
                method: "GET"
            });
            const data = await response.json();
            return {
                lat: data.results[0].geometry.location.lat,
                long: data.results[0].geometry.location.lng
            };
        }
        catch (error) {
            return console.log(error);
        }
    }

    async geocodeFromCity(city) {
       try {
            const response = await fetch(googleMapsServer + "/geocode/json?address=" + city + ",+Canada&key=" + key, {
                method: "GET"
            });
            const data = await response.json();
            return {
                lat: data.results[0].geometry.location.lat,
                long: data.results[0].geometry.location.lng
            };
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


const mapController = new MapController()
export default (mapController)