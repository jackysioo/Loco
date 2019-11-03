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
import { Colors, user, Images } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';


class UserScreen extends React.Component {

    render() {

        const reviews = user.reviews.map(review => {
            return (
                <View style={styles.userContainer}>
                    <View style={styles.rating}>
                        <HeadingText1 style={{ color: Colors.white }}> {review.rating} </HeadingText1>
                        <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24.png')} />
                    </View>
                    <Image source={{ uri: review.image }} style={styles.reviewImage}></Image>
                    <View style={{ margin: 15 }}>
                        <View style={styles.review}>
                            <HeadingText1>{review.title}</HeadingText1>
                            <ParagraphText1 style={{ color: Colors.placeholder }}>{review.date}</ParagraphText1>
                        </View>
                        <ParagraphText2>{review.review}</ParagraphText2>
                    </View>
                </View>)
        })

        const services = user.services.map(service => {
            return (
                <View style={styles.userContainer}>
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

        const appointments = user.appointments.map(appointment => {
            if (appointment.type === "client") {
                return (
                    <View style={styles.userContainer}>
                        <TouchableOpacity style={styles.rating}>
                            <HeadingText2 style={styles.cancel}> Cancel </HeadingText2>
                            <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-cancel-64.png')} />
                        </TouchableOpacity>
                        <Image source={{ uri: appointment.image }} style={styles.reviewImage}></Image>
                        <View style={{ margin: 15 }}>
                            <View style={styles.review}>
                                <HeadingText1 style={{ color: Colors.primary }}>{appointment.fullName} </HeadingText1>
                                <ParagraphText2 style={{ color: Colors.placeholder }}>BOOKED YOU</ParagraphText2>
                            </View>
                            <View style={styles.review}>
                                <HeadingText2 style={{ color: Colors.placeholder }}>SERVICE: </HeadingText2>
                                <ParagraphText2 style={{ color: Colors.primary }}>{appointment.service}</ParagraphText2>
                            </View>
                            <View style={styles.review}>
                                <HeadingText2 style={{ color: Colors.placeholder }}>DATE: </HeadingText2>
                                <ParagraphText2
                                    style={{ color: Colors.primary }}>{appointment.date} ➔ {appointment.time}</ParagraphText2>
                            </View>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.userContainer}>
                        <TouchableOpacity style={styles.rating}>
                            <HeadingText2 style={styles.cancel}> Cancel </HeadingText2>
                            <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-cancel-64.png')} />
                        </TouchableOpacity>
                        <Image source={{ uri: appointment.image }} style={styles.reviewImage}></Image>
                        <View style={{ margin: 15 }}>
                            <View style={styles.review}>
                                <ParagraphText2 style={{ color: Colors.placeholder }}>YOU BOOKED </ParagraphText2>
                                <HeadingText1 style={{ color: Colors.primary }}>{appointment.fullName}</HeadingText1>
                            </View>
                            <View style={styles.review}>
                                <HeadingText2 style={{ color: Colors.placeholder }}>SERVICE: </HeadingText2>
                                <ParagraphText2 style={{ color: Colors.primary }}>{appointment.service}</ParagraphText2>
                            </View>
                            <View style={styles.review}>
                                <HeadingText2 style={{ color: Colors.placeholder }}>DATE: </HeadingText2>
                                <ParagraphText2
                                    style={{ color: Colors.primary }}>{appointment.date} ➔ {appointment.time}</ParagraphText2>
                            </View>
                        </View>
                    </View>
                )
            }
        })

        const { navigation } = this.props;

        // only display 6 or less reviews/appointments on userScreen
        var displayReviews = reviews;
        var displayAppointments = appointments;
        if (reviews.length > 6) {
            displayReviews = displayReviews.slice(0, 6);
        }
        if (appointments.length > 6) {
            displayAppointments = displayAppointments.slice(0, 6);
        }

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: '5%' }}>
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
                                    <TouchableOpacity onPress={() => navigation.navigate('Following')} style={styles.following}>
                                        <HeadingText1 style={{ color: Colors.primary }}> {user.following.length} </HeadingText1>
                                        <HeadingText2 style={{ color: Colors.primary }}> Following </HeadingText2>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Reviews',
                                        { reviews: reviews })} style={styles.reviewNum}>
                                        <HeadingText1 style={{ color: Colors.primary }}> {user.reviews.length} </HeadingText1>
                                        <HeadingText2 style={{ color: Colors.primary }}> Reviews </HeadingText2>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.info}>
                                    <HeadingText1 style={{
                                        alignSelf: 'center', marginTop: 10,
                                        marginBottom: 8, color: Colors.placeholder
                                    }}>Y O U R  I N F O R M A T I O N</HeadingText1>
                                    <View style={{ justifyContent: 'space-between' }}>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 140 }}>Username:</HeadingText1>
                                            <HeadingText2>{user.username}</HeadingText2>
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 140 }}>Full Name:</HeadingText1>
                                            <HeadingText2>{user.firstName} {user.lastName}</HeadingText2>
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <View style={{ flexDirection: "column" }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <HeadingText1 style={{ paddingRight: 140 }}>Address:</HeadingText1>
                                                    <HeadingText2>{user.addressLine}</HeadingText2>
                                                </View>
                                                <HeadingText2 style={{ alignSelf: 'flex-end' }}>{user.addressCity}, {user.addressProvince}</HeadingText2>
                                                <HeadingText2 style={{ alignSelf: 'flex-end' }}>{user.addressPostalCode}</HeadingText2>
                                            </View>
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 140 }}>Birthday:</HeadingText1>
                                            <HeadingText2>{user.birthday}</HeadingText2>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.reviews}>
                                    <HeadingText1 style={{
                                        marginTop: 10, marginBottom: 3,
                                        color: Colors.placeholder
                                    }}>Y O U R  S E R V I C E S</HeadingText1>
                                    <ScrollView horizontal={true}
                                        decelerationRate={0}
                                        snapToInterval={10}
                                        snapToAlignment={"center"}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.itemContainer}>
                                        {services}
                                    </ScrollView>
                                </View>
                                <View style={styles.reviews}>
                                    <HeadingText1 style={{
                                        marginTop: 10, marginBottom: 3,
                                        color: Colors.placeholder
                                    }}>Y O U R  R E V I E W S</HeadingText1>
                                    <ScrollView horizontal={true}
                                        decelerationRate={0}
                                        snapToInterval={10}
                                        snapToAlignment={"center"}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.itemContainer}>
                                        {displayReviews}
                                    </ScrollView>
                                    <TouchableOpacity onPress={() => navigation.navigate('Reviews',
                                        { reviews: reviews })} style={{ alignSelf: "flex-end", paddingRight: 20 }}>
                                        <ParagraphText1 style={styles.viewAll}> View All ({reviews.length}) </ParagraphText1>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.reviews}>
                                    <HeadingText1 style={{
                                        marginTop: 10, marginBottom: 3,
                                        color: Colors.placeholder
                                    }}>Y O U R  A P P O I N T M E N T S</HeadingText1>
                                    <ScrollView horizontal={true}
                                        decelerationRate={0}
                                        snapToInterval={10}
                                        snapToAlignment={"center"}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.itemContainer}>
                                        {displayAppointments}
                                    </ScrollView>
                                    <TouchableOpacity onPress={() => navigation.navigate('Appointments',
                                        { appointments: appointments })} style={{ alignSelf: "flex-end", paddingRight: 20 }}>
                                        <ParagraphText1 style={styles.viewAll}> View All ({appointments.length}) </ParagraphText1>
                                    </TouchableOpacity>
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
        backgroundColor: 'rgba(0,0,0,0)',
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
        marginTop: height / 4.5,
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
        marginBottom: 40
    },
    innerInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 5
    },
    reviews: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 10,
    },
    userContainer: {
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
        paddingBottom: 5,
    },
    cancel: {
        shadowColor: Colors.black,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.7,
        color: '#ffc4c4'
    }
});

export default withNavigationFocus(UserScreen);