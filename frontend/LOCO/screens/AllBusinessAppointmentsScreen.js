import React from 'react';
import { withNavigation } from 'react-navigation';
import {
    Dimensions,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native';
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
const { width, height } = Dimensions.get("screen");


class AllBusinessAppointmentsScreen extends React.Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                
            </SafeAreaView>
        );
    }
}

export default withNavigation(AllBusinessAppointmentsScreen);