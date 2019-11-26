import React from 'react';
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
    TouchableWithoutFeedback,
    ActivityIndicator,
    Modal
} from 'react-native';

import { Colors, Images } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { hook } from 'cavy';
import UserController from '../controllers/UserController';
import userCache from '../caches/UserCache'

const { height, width } = Dimensions.get('screen');
const userController = new UserController()


class UserScreen extends React.Component {

    state = {
        signingOut: false,
        userID: '',
        ready: false
    }

    constructor(props) {
        super(props)
        this.user = null
    }

    componentWillMount() {
        userCache.getUserID()
            .then((id) => {
                this.setState({
                    userID: id
                })
                userController.getUser(id)
                    .then((data) => {
                        this.user = data.user
                        this.setState({
                            ready: true
                        })
                        userCache.storeData(id, data.user.toString())
                    })
            })
    }



    signout = () => {
        this.setState({
            signingOut: true
        })
        setTimeout(() => {
            this.props.navigation.navigate("Login")
        }, 1000)
    }

    renderSignOut() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.signingOut}>
                <View style={styles.modal}>
                    <ActivityIndicator style={styles.loading} size="large" color="#ffffff" />
                </View>
            </Modal>
        )
    }

    renderUser() {
        var count = 0;  // for testing purposes 

        const reviews = this.user.reviews.map((review) => {
            // only display up to 46 characters of review outside of a review
            var displayReview = review.review;
            if (review.review.length > 84) {
                displayReview = displayReview.slice(0, 84) + " . . .";
            }
            count++;

            return (
                <TouchableWithoutFeedback
                    key={review.title}
                    onPress={() => navigation.navigate('UserReview', {
                        rating: review.rating, image: review.image, title: review.title,
                        date: review.date, review: review.review, user: review.user, business: review.business, showEdit: true
                    })}
                    ref={this.props.generateTestHook('Review' + count)}>
                    <View style={styles.userContainer}>
                        <View style={styles.rating}>
                            <HeadingText1 style={[{ color: Colors.white }, styles.shadow]}> {review.rating} </HeadingText1>
                            <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24.png')} />
                        </View>
                        <Image source={{ uri: review.image }} style={styles.reviewImage}></Image>
                        <View style={{ margin: 15 }}>
                            <View style={styles.review}>
                                <HeadingText1>{review.title}</HeadingText1>
                                <ParagraphText1 style={{ color: Colors.placeholder }}>{review.date}</ParagraphText1>
                            </View>
                            <ParagraphText2>{displayReview}</ParagraphText2>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )

        })

        count = 0;
        const services = this.user.services.map((service) => {
            count++;
            return (
                <TouchableWithoutFeedback key={service.title}
                    ref={this.props.generateTestHook('Service' + count)}
                    onPress={() => navigation.navigate('Business', {
                        item: {
                            profilePic: service.profilePic,
                            user: service.user,
                            about: service.about,
                            title: service.title,
                            images: service.images,
                            rating: service.rating,
                            price: service.price,
                            region: service.region,
                            location: service.location,
                            reviews: service.reviews,
                            tags: service.tags
                        }
                    })}>
                    <View style={styles.userContainer}>
                        <View style={styles.rating}>
                            <HeadingText1 style={{
                                color: Colors.white, shadowColor: Colors.black,
                                shadowOffset: { width: -1, height: 1 },
                                shadowRadius: 1,
                                shadowOpacity: 1,
                            }}> {service.rating} </HeadingText1>
                            <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24.png')} />
                        </View>
                        <Image source={{ uri: service.images[0] }} style={styles.reviewImage}></Image>
                        <View style={{ margin: 15 }}>
                            <View style={styles.review}>
                                <HeadingText1>{service.title}</HeadingText1>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        })

        const { navigation } = this.props;

        // only display 6 or less reviews on User Screen
        var displayReviews = reviews;
        if (reviews.length > 6) {
            displayReviews = displayReviews.slice(0, 6);
        }

        // only display "Your Reviews" header and "view all" buttons if there are reviews 
        var viewall;
        var reviewTitle;
        if (reviews.length !== 0) {
            viewall = <TouchableOpacity onPress={() => navigation.navigate('Reviews',
                { reviews: reviews })} style={{ alignSelf: "flex-end", paddingRight: 20 }}
                ref={this.props.generateTestHook('ViewAllReviews.Button')}>
                <ParagraphText1 style={styles.viewAll}> View All ({reviews.length}) </ParagraphText1>
            </TouchableOpacity>;
            reviewTitle = <HeadingText1 style={styles.header}>R E V I E W S</HeadingText1>;
        }

        // only display "Your Services" header if there are services
        var serviceTitle;
        if (services.length !== 0) {
            serviceTitle = <HeadingText1 style={styles.header}>S E R V I C E S</HeadingText1>;
        }

        return (
            <View style={styles.container}>
                {this.renderSignOut()}
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: '5%' }}>
                            <TouchableOpacity
                                ref={this.props.generateTestHook('Signout.Button')}
                                style={styles.signoutButton} onPress={this.signout}>
                                <HeadingText1 style={[styles.shadow, { color: Colors.white }]}>Sign Out</HeadingText1>
                            </TouchableOpacity>
                            <View style={styles.profileCard}>
                                <View style={styles.profilePicContainer}>
                                    <Image source={{ uri: this.user.profilePic }} style={styles.profilePic} />
                                </View>
                                <View style={styles.editProfile}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Bio', {user : this.user, userID: this.state.userID})}
                                        ref={this.props.generateTestHook('EditProfile.Button')}>
                                        <ParagraphText1 style={{ color: Colors.primary }}> Edit Profile </ParagraphText1>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.resultDescription}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Following')} style={styles.following}
                                        ref={this.props.generateTestHook('Following.Button')}>
                                        <HeadingText1 style={{ color: Colors.primary }}> {this.user.following.length} </HeadingText1>
                                        <HeadingText2 style={{ color: Colors.primary }}> Following </HeadingText2>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Reviews',
                                        { reviews: reviews })} style={styles.reviewNum}
                                        ref={this.props.generateTestHook('AllReviews.Button')}>
                                        <HeadingText1 style={{ color: Colors.primary }}> {this.user.reviews.length} </HeadingText1>
                                        <HeadingText2 style={{ color: Colors.primary }}> Reviews </HeadingText2>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.info}>
                                    <HeadingText1 style={styles.header}>A B O U T</HeadingText1>
                                    <View style={{ justifyContent: 'space-between', marginTop: 5 }}>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ left: -55 }}>Username:</HeadingText1>
                                            <HeadingText2 style={{ right: -55 }}>{this.user.username}</HeadingText2>
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ left: -55 }}>Full Name:</HeadingText1>
                                            <HeadingText2 style={{ right: -55 }}>{this.user.firstName} {this.user.lastName}</HeadingText2>
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <View style={{ flexDirection: "column" }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <HeadingText1 style={{ left: -55 }}>Address:</HeadingText1>
                                                    <HeadingText2 style={{ right: -83 }}>{this.user.addressLine}</HeadingText2>
                                                </View>
                                                <HeadingText2 style={{ alignSelf: 'flex-end', right: -83 }}>{this.user.addressCity}, {this.user.addressProvince}</HeadingText2>
                                                <HeadingText2 style={{ alignSelf: 'flex-end', right: -83 }}>{this.user.addressPostalCode}</HeadingText2>
                                            </View>
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ left: -55 }}>Phone:</HeadingText1>
                                            <HeadingText2 style={{ right: -55 }}>{this.user.phoneNumber}</HeadingText2>
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ left: -55 }}>E-mail:</HeadingText1>
                                            <HeadingText2 style={{ right: -55 }}>{this.user.email}</HeadingText2>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.reviews}>
                                    <HeadingText1 style={styles.header}>B I O</HeadingText1>
                                    <View style={styles.bio}>
                                        <ParagraphText1 style={{ margin: 20 }}>
                                            {this.user.bio}
                                        </ParagraphText1>
                                    </View>
                                </View>
                                <View style={styles.reviews}>
                                    {serviceTitle}
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
                                    {reviewTitle}
                                    <ScrollView horizontal={true}
                                        decelerationRate={0}
                                        snapToInterval={10}
                                        snapToAlignment={"center"}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.itemContainer}>
                                        {displayReviews}
                                    </ScrollView>
                                    {viewall}
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View >)
    }

    render() {
        return (
            <View>
                {this.state.ready && this.renderUser()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        marginBottom: 3,
        color: Colors.primary,
        alignSelf: 'center',
    },
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
    signoutButton: {
        position: "absolute",
        right: 10,
        margin: 10,
    },
    modal: {
        backgroundColor: Colors.black,
        opacity: 0.5,
        height: height,
        width: width
    },
    loading: {
        marginTop: height / 2,
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
        marginTop: -1,
        shadowColor: Colors.black,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 1,
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
    },
    bio: {
        marginTop: 13,
        flex: 1,
        width: width - 60,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 20,
        zIndex: 1,
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 1,
    },
});

//export default withNavigationFocus(UserScreen);
const UserScreenSpec = hook(UserScreen);
export default (UserScreenSpec);