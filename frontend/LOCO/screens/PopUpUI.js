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
    Button,
    KeyboardAvoidingView,
    TextInput,
    TouchableHighlight,
    Keyboard,
} from 'react-native';
import MapView from 'react-native-maps';
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import NotificationPopup from 'react-native-push-notification-popup';
const { width, height } = Dimensions.get("screen");

class PopUpUI extends React.Component {
    // TEST POP UP NOTIFICATION
    componentDidMount() {
        this.popup.show({
            onPress: function () { console.log('Pressed') },
            appTitle: 'Some App',
            timeText: 'Now',
            title: 'Hello World',
            body: 'This is a sample message.\nTesting emoji 😀',
            slideOutTime: 5000
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NotificationPopup ref={ref => this.popup = ref} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },
});


export default PopUpUI;