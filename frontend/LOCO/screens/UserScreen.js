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
                        contentContainerStyle={{ paddingBottom: 120, marginTop: "10%" }}>
                        <View style={styles.profileCard}>
                            <View style={styles.profilePicContainer}>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 30,
                                            textShadowColor: "#2a95a3",
                                            color: "#ffffff",
                                            shadowOpacity: 0.1,
                                            textShadowRadius: 5,
                                            marginBottom: 10,
                                            fontWeight: "400",
                                            textAlign: "center"
                                        }}>
                                        UserName123
                                    </Text>
                                    <Image source={{ uri: Images.ProfilePicture }} style={styles.profilePic} />

                                </View>

                                <View style={styles.profileButtons}>
                                    <Button
                                        title="Edit Profile"
                                        color="#2a95a3">
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userStatOuter}>
                            <View style={styles.userStatInner}>
                                <Text style={styles.userStatsNum}>2000</Text>
                                <Text style={styles.userStats}>Followers</Text>
                            </View>
                            <View style={styles.userStatInner}>
                                <Text style={styles.userStatsNum}>10</Text>
                                <Text style={styles.userStats}>Reviews</Text>
                            </View>
                            <View style={styles.userStatInner}>
                                <Text style={styles.userStatsNum}>6</Text>
                                <Text style={styles.userStats}>Photos</Text>
                            </View>
                        </View>

                        <View style={styles.info}>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.title}>Your Bio: </Text>
                                <Text style={styles.text}>This is where the user writes their bio. Interests, hobbies, skills, etc. They can also write about their experiences and different certificates or other form of validations for the skills they have.</Text>
                            </View>
                            <View style={{ borderBottomColor: "#77aebf", borderBottomWidth: 1.3, marginTop: 10, }} />
                            <View style={styles.nameAge}>
                                <Text>
                                    <Text style={styles.title}>Full Name: </Text>
                                    <Text style={styles.text}>FirstName LastName</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: "column", marginTop: 10 }}>
                                <Text style={styles.title}>Address: </Text>
                                <Text style={styles.text}>8888 Address Street</Text>
                                <Text style={styles.text}>Vancouver, BC</Text>
                                <Text style={styles.text}>A8A 8A8</Text>
                            </View>
                            <View style={styles.nameAge}>
                                <Text>
                                    <Text style={styles.title}>Age: </Text>
                                    <Text style={styles.text}>20</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.info}>
                            <View style={{ borderBottomColor: "#77aebf", borderBottomWidth: 1.3, marginTop: 10, }} />
                            <Text style={{ marginTop: 10, color: "#2a95a3", fontWeight: "400", fontSize: 22, }}>Your Businesses</Text>
                            <View style={styles.business}>
                                <View style={styles.businessName}>
                                    <Text style={styles.title}>Eyelash Extensions</Text>
                                </View>
                                <View style={styles.rating}>
                                    <Text style={styles.text}>Rating: </Text>
                                    <Text style={styles.text}>9/10</Text>
                                </View>
                                <View style={styles.gallery}>
                                    <Image source={{ uri: Images.pic1 }} style={styles.imageGallery} />
                                    <Image source={{ uri: Images.pic2 }} style={styles.imageGallery} />
                                    <Image source={{ uri: Images.pic3 }} style={styles.imageGallery} />
                                    <Image source={{ uri: Images.pic4 }} style={styles.imageGallery} />
                                    <Image source={{ uri: Images.pic5 }} style={styles.imageGallery} />
                                    <Image source={{ uri: Images.pic6 }} style={styles.imageGallery} />
                                </View>
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
        height: height
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
    profileButtons: {
        marginTop: 1,
        paddingBottom: 5,
        alignSelf: "center",
        flexDirection: 'row',
    },
    userStatOuter: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    userStatInner: {
        flexDirection: "column",
        paddingHorizontal: 25,
    },
    userStats: {
        textAlign: "center",
        fontSize: 17,
        color: "#2a95a3",
        fontWeight: '300',
    },
    userStatsNum: {
        textAlign: "center",
        fontSize: 20,
        color: "#2a95a3",
        fontWeight: '300',
        marginRight: 5,
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure
    },
    nameAge: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 10,
    },
    info: {
        flexDirection: "column",
        marginHorizontal: 20,
    },
    text: {
        color: "#2a95a3",
        fontWeight: "300",
        fontSize: 17,
    },
    title: {
        color: "#2a95a3",
        fontWeight: "400",
        fontSize: 20,
    },
    business: {
        flexDirection: "column",
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
    },
    businessName: {

    },
    rating: {
        paddingTop: 3,
        flexDirection: "row",
        alignItems: 'center',
    },
    gallery: {
        justifyContent: "center",
        flexDirection: "row",
        display: "flex",
        flexWrap: "wrap",
    },
    imageGallery: {
        marginTop: 5,
        width: 116,
        height: 116,
        borderRadius: 1,
        margin: 0.6,
    },
});

export default UserScreen;
