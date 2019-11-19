import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {
    Image,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    View
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
import { hook } from 'cavy'
const { width, height } = Dimensions.get("screen");


class MapScreen extends React.Component {

    triggerCallback(result) {
        this.props.item(result)
    }

    renderMarkers(results) {
        return results.map((result) => {
            return (
                <Marker
                    key={result.title}
                    identifier={result.title}
                    ref={(marker) => { this.marker = marker }}
                    coordinate={{
                        latitude: result.location.lat,
                        longitude: result.location.long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                    <Image
                        source={require('../assets/icons/icons8-marker-64.png')}
                        style={styles.dropPinIcon} />
                    <Callout
                        onPress={() => {this.triggerCallback(result)}}
                        tooltip={false}
                        ref={this.props.generateTestHook('Callout.Button')}>
                            <View style={styles.searchItemContainer}>
                                <Image source={{ uri: result.profilePic }} style={styles.profilePic} />
                                <View style={styles.resultContainer}>
                                    <Text style={styles.resultTitle}>
                                        {result.title}
                                    </Text>
                                    <View style={styles.resultDescriptions}>
                                        <Text style={{ fontSize: 12, color: Colors.primary, marginRight: 5 }}> {result.user} </Text>
                                        <Text style={{ fontSize: 12, color: Colors.primary }}> {result.rating} </Text>
                                        <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24-aqua.png')} />
                                        <Text style={{ fontSize: 12, color: Colors.primary }}> {result.reviews.length} </Text>
                                        <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-chat-24-aqua.png')} />
                                    </View>
                                    <View style={styles.resultDescriptions}>
                                        <Text style={{ fontSize: 10, color: Colors.placeholder }}> {result.price}</Text>
                                        <Text style={{ fontSize: 4, color: Colors.placeholder }}> {'  \u2B24'} </Text>
                                        <Text style={{ fontSize: 10, color: Colors.placeholder }}> {result.region}</Text>
                                    </View>
                                </View>
                            </View>
                    </Callout>
                </Marker>
            )
        })
    }

    render() {
        const { location, results } = this.props;

        return (
            <View style={styles.container}>
                <MapView
                    moveOnMarkerPress
                    style={styles.mapStyle}
                    customMapStyle={mapStyle}
                    ref={(ref) => { this.map = ref; }}
                    initialRegion={{
                        latitude: location.lat,
                        longitude: location.long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    provider='google'
                    showsCompass={false}>
                    {this.renderMarkers(results)}
                </MapView>
            </View>
        )
    }
}

MapScreen.propTypes = {
    results: PropTypes.array
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
    dropPinIcon: {
        width: 30,
        height: 40
    },
    searchItemContainer: {
        width: 250,
        flex: 1,
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultContainer: {
        padding: 10,
        width: 160,
    },
    resultTitle: {
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 2,
        flexWrap: "wrap",
    },
    resultDescriptions: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: "wrap",
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: Colors.white,
        marginLeft: 10
    },
    ratingIcon: {
        width: 12,
        height: 12,
    },
    reviewIcon: {
        width: 15,
        height: 15,
        marginTop: 3
    },
});

//export default withNavigation(MapScreen);
const MapScreenSpec = hook(MapScreen);
export default (MapScreenSpec);
