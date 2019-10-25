import React from 'react'; import {
    Platform,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    View,
} from 'react-native';
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
import NotificationPopup from 'react-native-push-notification-popup';

const { width, height } = Dimensions.get("screen");

class PopUpUI extends React.Component {
    // TEST POP UP NOTIFICATION
    componentDidMount() {
        this.popup.show({
            appIconSource: Images.LogoIcon,
            appTitle: 'L O C O',
            timeText: 'Now',
            title: "Username",
            body: 'This is a sample message 😀\nHi!',
            slideOutTime: 10000
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
        marginTop: '1%'
    },
});


export default PopUpUI;