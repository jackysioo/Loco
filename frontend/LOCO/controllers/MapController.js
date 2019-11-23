import React from "react";
import {
    View,
} from 'react-native';

const googleMapsServer = "https://maps.googleapis.com/maps/api"
const key = "AIzaSyAUmi1W1FT2s1UGYlGtWuaSWe2GoPbESD0"

class MapController extends React.Component {

    geocodeFromAddress(streetNum, street, city) {
        return fetch(googleMapsServer + "/geocode/json?address=" + streetNum + "+" + street + ",+" + city + ",+Canada&key=" + key, {
            method: "GET"
        })
            .then(response => response.json())
            .then((data) => {
                return {
                    lat: data.results[0].geometry.location.lat,
                    long: data.results[0].geometry.location.lng
                }
            })
            .catch(error => console.log(error))
    }

    geocodeFromCity(city) {
       return fetch(googleMapsServer + "/geocode/json?address=" + city + ",+Canada&key=" + key, {
            method: "GET"
        })
            .then(response => response.json())
            .then((data) => {
                return {
                        lat: data.results[0].geometry.location.lat,
                        long: data.results[0].geometry.location.lng
                }
            })
            .catch(error => console.log(error))
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