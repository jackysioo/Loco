import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import {
    Dimensions,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Button,
    Modal
} from 'react-native';

const { height, width } = Dimensions.get('screen');
import { Card } from '../components';
import { Colors, user, Images } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';


class UserScreen extends React.Component {

    render() {

        const reviews = user.reviews.map(review => {
            return (
                <View style={styles.reviewContainer}>
                    <View style={styles.rating}>
                        <HeadingText1 style={{ color: Colors.white }}> {review.rating} </HeadingText1>
                        <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24.png')} />
                    </View>
                    <Image source={{ uri: review.image }} style={styles.reviewImage}></Image>
                    <View style={{ margin: 15 }}>
                        <View style={styles.review}>
                            <HeadingText1>{review.title}</HeadingText1>
                            <Text style={{ color: Colors.placeholder }}>{review.date}</Text>
                        </View>
                        <Text>{review.review}</Text>
                    </View>
                </View>)
        })

        const services = user.services.map(service => {
            return (
                <View style={styles.serviceContainer}>
                    <View style={styles.rating}>
                        <HeadingText1 style={{ color: Colors.white }}> {service.rating} </HeadingText1>
                        <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24.png')} />
                    </View>
                    <Image source={{ uri: service.image }} style={styles.reviewImage}></Image>
                    <View style={{ margin: 15 }}>
                        <View style={styles.review}>
                            <HeadingText1>{service.title}</HeadingText1>
                        </View>
                    </View>
                </View>
            )
        })

        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.profileCard}>
                                <View style={styles.profilePicContainer}>
                                    <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
                                </View>
                                <View style={styles.editProfile}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Bio')}>
                                        <ParagraphText1 style={{ color: Colors.primary }}> Edit Profile </ParagraphText1>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.resultDescription}>
                                    <View style={styles.following}>
                                        <HeadingText1 style={{ color: Colors.primary }}> {user.following} </HeadingText1>
                                        <HeadingText2 style={{ color: Colors.primary }}> Following </HeadingText2>
                                    </View>
                                    <View style={styles.reviewNum}>
                                        <HeadingText1 style={{ color: Colors.primary }}> {user.reviews.length} </HeadingText1>
                                        <HeadingText2 style={{ color: Colors.primary }}> Reviews </HeadingText2>
                                    </View>
                                </View>
                                <View style={styles.info}>
                                    <HeadingText1 style={{ margin: 10, color: Colors.placeholder }}>Y O U R  I N F O R M A T I O N</HeadingText1>
                                    <View style={styles.innerInfo}>
                                        <HeadingText1>Username:  </HeadingText1>
                                        <HeadingText2>{user.username}</HeadingText2>
                                    </View>
                                    <View style={styles.innerInfo}>
                                        <HeadingText1>Full Name:  </HeadingText1>
                                        <HeadingText2>{user.fullName}</HeadingText2>
                                    </View>
                                    <View style={styles.innerInfo}>
                                        <View>
                                            <HeadingText1>Address:  </HeadingText1>
                                            <View style={{ flexDirection: "column", marginLeft: 20, marginTop: 5 }}>
                                                <HeadingText2>{user.address[0]}</HeadingText2>
                                                <HeadingText2>{user.address[1]}</HeadingText2>
                                                <HeadingText2>{user.address[2]}</HeadingText2>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.innerInfo}>
                                        <HeadingText1>Birthday:  </HeadingText1>
                                        <HeadingText2>{user.birthday}</HeadingText2>
                                    </View>
                                </View>
                                <View style={styles.services}>
                                    <HeadingText1 style={{ margin: 10, color: Colors.placeholder }}>Y O U R  S E R V I C E S</HeadingText1>
                                    <ScrollView horizontal={true}
                                        decelerationRate={0}
                                        snapToInterval={300}
                                        snapToAlignment={"center"}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.itemContainer}>
                                        {services}
                                    </ScrollView>
                                </View>
                                <View style={styles.reviews}>
                                    <HeadingText1 style={{ margin: 10, color: Colors.placeholder }}>Y O U R  R E V I E W S</HeadingText1>
                                    <ScrollView horizontal={true}
                                        decelerationRate={0}
                                        snapToInterval={300}
                                        snapToAlignment={"center"}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.itemContainer}>
                                        {reviews}
                                    </ScrollView>
                                    <ParagraphText1 style={styles.viewAll}> View All </ParagraphText1>
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginHorizontal: width / 40,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    profileBackground: {
        height: height / 2,
        width: width
    },
    profileContainer: {
        width: width,
        height: height - 50,
        padding: 0,
        zIndex: 1
    },
    profileCard: {
        marginTop: height / 4,
        marginHorizontal: 10,
        marginBottom: 20,
        paddingBottom: 10,
        borderRadius: 10,
        zIndex: 5,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultDescription: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    following: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: Colors.primary,
        position: 'absolute',
        left: -170,
        top: -50,
        margin: 10,
        zIndex: 1
    },
    reviewNum: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: Colors.primary,
        position: 'absolute',
        right: -170,
        top: -50,
        margin: 10,
        zIndex: 1
    },
    profilePicContainer: {
        position: "relative",
        marginTop: -70,
        padding: 2,
        zIndex: 5
    },
    profilePic: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 10,
        borderColor: Colors.white
    },
    ratingIcon: {
        width: 14,
        height: 14,
        marginTop: -1
    },
    reviewIcon: {
        width: 15,
        height: 15,
        marginTop: 2
    },
    info: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    innerInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    reviews: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 15
    },
    services: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 10
    },
    reviewContainer: {
        width: width - 60,
        marginHorizontal: width / 60,
        marginVertical: 15,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    serviceContainer: {
        width: width - 60,
        marginHorizontal: width / 60,
        marginVertical: 15,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    review: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rating: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: Colors.white,
        position: 'absolute',
        left: 0,
        margin: 10,
        zIndex: 1,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    reviewImage: {
        width: "100%",
        height: height / 6,
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
    editProfile: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: Colors.primary,
        position: 'absolute',
        top: 60,
        margin: 10,
        zIndex: 1
    },
    viewAll: {
        color: Colors.primary,
        marginTop: -7,
        marginLeft: width / 1.4,
    }
});

export default withNavigationFocus(UserScreen);