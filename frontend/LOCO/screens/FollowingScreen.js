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
import { Images, user, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
const { width, height } = Dimensions.get("screen");


class FollowingScreen extends React.Component {

    render() {
        const following = user.following.map((follower) => {
            return (
                <View style={styles.followerContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={styles.profilePicContainer}>
                            <Image source={{ uri: follower.profilePic }} style={styles.profilePic} />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: -90 }}>
                            <HeadingText1 style={{ color: Colors.primary }}>{follower.fullName}</HeadingText1>
                            <ParagraphText1 style={{ color: Colors.placeholder }}>{follower.username}</ParagraphText1>
                        </View>
                        <TouchableOpacity>
                            <HeadingText2 style={styles.viewProfile}>View Profile</HeadingText2>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <ImageBackground
                            source={Images.ProfileBackground}
                            style={styles.outerContainer}
                            imageStyle={styles.background}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={styles.itemContainer}>
                                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                                    <HeadingText1 style={{ color: Colors.white }}> Back </HeadingText1>
                                </TouchableOpacity>
                                <View style={styles.innerContainer}>
                                    <HeadingText1 style={{
                                        marginTop: 30,
                                        marginBottom: 20,
                                        color: Colors.placeholder,
                                        alignSelf: 'center'
                                    }}>F O L L O W I N G  Y O U</HeadingText1>
                                    {following}
                                </View>
                            </ScrollView>
                        </ImageBackground>
                    </View>
                </View >
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        marginBottom: 40,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    followerContainer: {
        flex: 1,
        paddingVertical: 5,
    },
    background: {
        marginTop: -20,
        height: height / 2,
        width: width
    },
    outerContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1,
    },
    innerContainer: {
        marginTop: 40,
        marginHorizontal: 10,
        marginBottom: 40,
        paddingBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        zIndex: 5,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.25,
    },
    profilePicContainer: {
        position: "relative",
        padding: 2,
        zIndex: 5
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    viewProfile: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        color: Colors.placeholder,
        borderColor: Colors.placeholder,
        borderWidth: 1,
        borderRadius: 14,
        height: 27,
    },
    back: {
        position: "absolute",
        left: 12,
        top: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    }
});

export default withNavigation(FollowingScreen);