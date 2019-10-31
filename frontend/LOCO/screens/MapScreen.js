import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    View,
    Button
} from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
const { width, height } = Dimensions.get("screen");

class MapScreen extends React.Component {

    getInitialState() {
        return {
            coordinate: new AnimatedRegion({
                latitude: location.latitude,
                longitude: location.longitude,
            }),
        };
    }
    componentWillReceiveProps(nextProps) {
        const duration = 500

        if (this.props.results.location !== nextProps.results.location) {
            if (Platform.OS === 'android') {
                if (this.marker) {
                    this.marker._component.animateMarkerToCoordinate(
                        nextProps.results.location,
                        duration
                    );
                }
            } else {
                this.state.results.location.timing({
                    ...nextProps.results.location,
                    duration
                }).start();
            }
        }
    }

    render() {
        const { navigation, location, results } = this.props;

        return (
            <View style={styles.container}>
                <MapView
                    moveOnMarkerPress
                    style={styles.mapStyle}
                    customMapStyle={mapStyle}
                    initialRegion={{
                        latitude: location.lat,
                        longitude: location.long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    provider='google'
                    showsCompass={false}>
                    {results.map(result => (
                        <MapView.Marker.Animated
                            key={result.title}
                            ref={marker => { this.marker = marker }}
                            coordinate={{
                                latitude: result.location.lat,
                                longitude: result.location.long,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}
                            title={result.title}
                            // image={{ uri: require('../assets/icons/icons8-marker-64.png') }}
                            >
                        </MapView.Marker.Animated>
                    ))}
                </MapView>
            </View>
        )
    }
}

MapScreen.propTypes = {
    results: PropTypes.object
}

const mapStyle = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#51bfbb"
            }
        ]
    }
]

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },
    mapStyle: {
        width: width,
        height: height
    },
});

export default withNavigation(MapScreen);
