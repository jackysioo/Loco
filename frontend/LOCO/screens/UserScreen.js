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

import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class UserScreen extends React.Component {
    render() {
        return (
            <View style={styles.profile}>
                <ImageBackground
                    source={Images.ProfileBackground}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width, marginTop: '10%' }}>
                        <View style={styles.profileCard}>
                            <View style={styles.profilePicContainer}>
                                <Image
                                    source={{ uri: Images.ProfilePicture }}
                                    style={styles.profilePic}/>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.profileButtons}>
                                <Button
                                    title="Follow"
                                    color="#ffffff"
                                    backgroundColor="#51bfbb">
                                </Button>
                                <Button
                                    title="Message"
                                    color="#ffffff"
                                    backgroundColor="#0e4f64">
                                </Button>
                            </View>
                            <View style={styles.profileButtons}>
                                    <Text
                                        bold
                                        size={12}
                                        color={Colors.text}
                                        style={{ marginBottom: 4 }}>
                                        2K
                                    </Text>
                                    <Text size={12}>Followers</Text>
                                    <Text
                                        bold
                                        color={Colors.text}
                                        size={12}
                                        style={{ marginBottom: 4 }}>
                                        10
                                    </Text>
                                    <Text size={12}>Reviews</Text>
                                    <Text
                                        bold
                                        color={Colors.text}
                                        size={12}
                                        style={{ marginBottom: 4 }}>
                                        5
                                    </Text>
                                    <Text size={12}>Photos</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: '#ffffff',
    },
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1,
    },
    profileBackground: {
        width: width,
        height: height / 2
    },
    profilePicContainer: {
        position: "relative",
        marginTop: -80
    },
    profileCard: {
        padding: 18,
        marginHorizontal: 18,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2
    },
    profilePic: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0,
        alignSelf: "center"
    },
    info: {
        paddingHorizontal: 40
    },
    profileButtons: { 
        marginTop: 20, 
        paddingBottom: 24, 
        alignSelf: "center",
        flexDirection: 'row' 
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: "center",
      width: thumbMeasure,
      height: thumbMeasure
    }
});

export default UserScreen;
