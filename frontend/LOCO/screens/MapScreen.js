import React from 'react'; import {
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    View,
    Button
} from 'react-native';
import MapView from 'react-native-maps';
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
const { width, height } = Dimensions.get("screen");

class MapScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 49.2827,
                        longitude: -123.1207,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    provider='google'
                    showsCompass={false}
                />
            </View>
        )
    }
}

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

export default MapScreen;
