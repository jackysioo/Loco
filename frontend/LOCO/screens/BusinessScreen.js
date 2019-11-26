import React from 'react';
import { withNavigation } from 'react-navigation';
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
    TextInput,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';

import { Colors, Images } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { hook } from 'cavy';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import NumericInput from 'react-native-numeric-input'
import ChatController from '../controllers/ChatController';
import userCache from '../caches/UserCache'
import UserController from '../controllers/UserController';

const userController = new UserController()
const chatController = new ChatController()
const { height, width } = Dimensions.get('screen');

class BusinessScreen extends React.Component {
    state = {
        messageFormVisible: false,
        addReviewVisible: false,
        subject: '',
        message: '',
        reviewTitleInput: '',
        reviewInput: '',
        ratingInput: '',
        messageSentError: false,
        reviewSuccess: false,
        userID: '',
        businessID: this.props.navigation.state.params.item._id
    };

    componentDidMount() {
        chatController.init()
        userCache.getUserID()
            .then((id) => {
                this.setState({
                    userID: id
                })
            })
        console.log(this.props.navigation.state.params.item)
    }

    //UPDATE USER TO USER ID
    sendMessage() {
        chatController.sendMessageToUser(this.props.navigation.state.params.item.user, this.state.message)
            .then((res) => {
                if (res === 200) {
                    this.setState({
                        messageFormVisible: false,
                    });
                } else {
                    this.setState({
                        messageSentError: true,
                    });
                }
            })
    }


    updateMessage = (message) => {
        this.setState({ message });
    };

    updateReviewTitle = (reviewTitleInput) => {
        this.setState({ reviewTitleInput });
    };

    updateReview = (reviewInput) => {
        this.setState({ reviewInput });
    };

    updateRating = (ratingInput) => {
        this.setState({ ratingInput });
    };

    addReview = async () => {
        userController.addReview({
            title: this.state.reviewTitleInput,
            message: this.state.reviewInput,
            rating: this.state.ratingInput
        }, this.state.userID, this.props.navigation.state.params.item._id)
            .then((res) => {
                if (res !== 404) {
                    this.setState({
                        success: true
                    })

                    setTimeout(() => {
                        this.props.navigation.goBack()
                    }, 1000)
                }
            })

    }

    renderSuccess() {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.reviewSuccess}>
                <View style={styles.modal}>
                    <HeadingText1 style={{ fontSize: 16, marginTop: 30, marginHorizontal: 15, justifyContent: "center", alignSelf: "center" }}>Successfully added new review!</HeadingText1>
                </View>
            </Modal>
        )
    }

    renderMessageForm() {
        const { message } = this.state;
        return (
            <Modal
                style={{ paddingVertical: 50 }}
                animationType="slide"
                transparent={false}
                visible={this.state.messageFormVisible}>
                <TouchableOpacity
                    ref={this.props.generateTestHook('CancelMessage.Button')}
                    style={[styles.backButton, { top: 50 }]}
                    onPress={() => {
                        this.setState({ messageFormVisible: false })
                    }}>
                    <HeadingText1 style={{ fontSize: 14, color: Colors.placeholder }}>Cancel</HeadingText1>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                        this.sendMessage();
                    }}>
                    <HeadingText1 style={{ fontSize: 14, color: Colors.primary }}>Send</HeadingText1>
                </TouchableOpacity>
                <HeadingText1 style={styles.headerTitle}> Send Message</HeadingText1>
                <View style={styles.messageFormContainer}>
                    <TextInput
                        ref={this.props.generateTestHook('Message.TextInput')}
                        multiline
                        numberOfLines={6}
                        style={[{ height: 200 }, styles.messageInput]}
                        onChangeText={this.updateMessage}
                        inputContainerStyle={{ backgroundColor: Colors.white }}
                        containerStyle={{ backgroundColor: '#ffffff' }}
                        inputStyle={{ fontSize: 13 }}
                        value={message}
                        placeholder="Type your message here..."
                        placeholderTextColor={Colors.placeholder}
                    />
                </View>
                {this.state.messageSentError &&
                    <ParagraphText1 style={{ fontSize: 12, color: Colors.error, marginHorizontal: 20 }}>
                        Oops! There was an error sending your message.
                </ParagraphText1>}
            </Modal>)
    }


    renderAddReview() {
        const { reviewTitleInput } = this.state;
        const { reviewInput } = this.state;
        const { ratingInput } = this.state;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.addReviewVisible}>
                <KeyboardAwareScrollView style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={styles.modalItemContainer}>
                                <TouchableOpacity
                                    style={styles.back}
                                    onPress={() => { this.setState({ addReviewVisible: false }) }}
                                // ref={this.props.generateTestHook('CancelEditReview.Button')}
                                >
                                    <HeadingText1 style={{ color: Colors.placeholder }}> Cancel </HeadingText1>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.save} onPress={this.addReview}
                                //ref={this.props.generateTestHook('SaveEditReview.Button')}
                                >
                                    <HeadingText1 style={{ color: Colors.primary }}> Add Review </HeadingText1>
                                </TouchableOpacity>
                                <View style={styles.innerContainer}>
                                    <View style={styles.list}>
                                        <TouchableOpacity style={styles.upload}>
                                            <ParagraphText2 style={{ marginRight: 7, fontSize: 12, color: Colors.highlight }}>u p l o a d</ParagraphText2>
                                            <Image source={require('../assets/icons/icons8-add-image-96.png')} style={{ height: 18, width: 18 }} />
                                        </TouchableOpacity>
                                        <TextInput
                                            //ref={this.props.generateTestHook('ReviewTitle.TextInput')}
                                            style={styles.reviewTitleInput}
                                            onChangeText={this.updateReviewTitle}
                                            inputContainerStyle={{ backgroundColor: Colors.white }}
                                            containerStyle={{ backgroundColor: '#ffffff' }}
                                            inputStyle={{ fontSize: 13 }}
                                            value={reviewTitleInput}
                                            placeholder={"Give your review a title!"}
                                            placeholderTextColor={Colors.placeholder} />
                                        <TextInput
                                            //ref={this.props.generateTestHook('Review.TextInput')}
                                            multiline={true}
                                            style={styles.reviewInput}
                                            onChangeText={this.updateReview}
                                            inputContainerStyle={{ backgroundColor: Colors.white }}
                                            containerStyle={{ backgroundColor: '#ffffff' }}
                                            inputStyle={{ fontSize: 13 }}
                                            value={reviewInput}
                                            placeholder={"Write about your experience!"}
                                            placeholderTextColor={Colors.placeholder} />
                                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <HeadingText1 style={styles.headerLeft}>R a t i n g</HeadingText1>
                                            <NumericInput
                                                containerStyle={{ marginRight: 7 }}
                                                minValue={0}
                                                maxValue={5}
                                                initValue={0}
                                                onChange={this.updateRating}
                                                totalWidth={100}
                                                totalHeight={33}
                                                separatorWidth={0.5}
                                                step={1}
                                                valueType='real'
                                                rounded
                                                textColor={Colors.black}
                                                borderColor={Colors.highlight} />
                                            <Image style={styles.icon} source={require('../assets/icons/icons8-star-24-grey.png')} />
                                        </View>
                                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                            <HeadingText1 style={styles.headerLeft}>S e r v i c e   b y</HeadingText1>
                                            <HeadingText2 style={styles.headerRight}> {this.props.navigation.state.params.item.user} </HeadingText2>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        )
    }


    render() {

        const images = this.props.navigation.state.params.item.images.map((image) => {
            return (
                <Image source={{ uri: image }} key={image} style={{ width: 195, height: 195, margin: 1 }} />
            )
        })
        const tags = this.props.navigation.state.params.item.tags.map((tag) => {
            return (
                <View key={tag} style={styles.tag}>
                    <Text style={{ fontSize: 10, color: Colors.primary }}> #{tag} </Text>
                </View>
            )
        })

        const reviews = this.props.navigation.state.params.item.reviews.map((review) => {
            // only display up to 46 characters of review outside of a review
            var displayReview = review.review;
            if (review.hasOwnProperty('review') && review.review.length > 84) {
                displayReview = displayReview.slice(0, 84) + " . . .";
            }

            return (
                <TouchableWithoutFeedback
                    key={review.title}
                    onPress={() => this.props.navigation.navigate('UserReview', {
                        id: review._id,
                        rating: review.rating, image: review.image, title: review.title,
                        date: review.date, review: review.review, user: review.user, business: review.business, showEdit: false
                    })}>
                    <View style={styles.reviewContainer}>
                        {this.state.reviewSuccess && this.renderSuccess()}
                        <View style={styles.rating}>
                            <HeadingText1 style={[styles.shadow, { color: Colors.white }]}> {review.rating} </HeadingText1>
                            <Image style={[styles.ratingIcon, styles.shadow]} source={require('../assets/icons/icons8-star-24.png')} />
                        </View>
                        <Image source={{ uri: review.image }} style={styles.reviewImage}></Image>
                        <View style={{ margin: 15 }}>
                            <View style={styles.review}>
                                <HeadingText1>{review.title}</HeadingText1>
                                <Text style={{ color: Colors.placeholder }}>{review.date}</Text>
                            </View>
                            <Text>{displayReview}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>)
        })

        // only display 6 or less reviews on Business Screen
        var displayReviews = reviews;
        if (reviews.length > 2) {
            displayReviews = displayReviews.slice(0, 2);
        }

        var viewall;
        if (reviews.length != 0) {
            viewall = <TouchableOpacity onPress={() => this.props.navigation.navigate('Reviews',
                { reviews: reviews })} style={{ alignSelf: "flex-end", paddingRight: 20 }}                                   >
                <ParagraphText1 style={styles.viewAll}> View All ({reviews.length}) </ParagraphText1>
            </TouchableOpacity>;
        }
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={{ uri: this.props.navigation.state.params.item.images[0] }}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}
                                ref={this.props.generateTestHook('BusinessBack.Button')}
                            >
                                <HeadingText1 style={styles.heading1}>Back</HeadingText1>
                            </TouchableOpacity>
                            <View style={styles.profileCard}>
                                <View style={styles.profilePicContainer}>
                                    <Image source={{ uri: this.props.navigation.state.params.item.profilePic }} style={styles.profilePic} />
                                </View>
                                <View style={styles.resultDescription}>
                                    <View style={styles.ratingNum}>
                                        <HeadingText1 style={{ color: Colors.primary }}> {this.props.navigation.state.params.item.rating} </HeadingText1>
                                        <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24-aqua.png')} />
                                    </View>
                                    <View style={styles.reviewNum}>
                                        <HeadingText1 style={{ color: Colors.primary }}> {this.props.navigation.state.params.item.reviews.length} </HeadingText1>
                                        <Image style={styles.reviewIcon} source={require('../assets/icons/icons8-chat-24-aqua.png')} />
                                    </View>
                                    <HeadingText1 style={styles.resultTitle}> {this.props.navigation.state.params.item.title} </HeadingText1>
                                    <Text style={{ fontSize: 16 }}> {this.props.navigation.state.params.item.user} </Text>
                                    <View style={styles.tags}>
                                        <Text style={{ fontSize: 12, color: Colors.placeholder }}> {this.props.navigation.state.params.item.price} </Text>
                                        <Text style={{ fontSize: 4, color: Colors.placeholder }}> {'\u2B24'} </Text>
                                        <Text style={{ fontSize: 12, color: Colors.placeholder }}> {this.props.navigation.state.params.item.region} </Text>
                                    </View>
                                    <View style={styles.tags}>
                                        {tags}
                                    </View>
                                    <Text style={{ margin: 10, marginTop: 20, fontSize: 14, color: Colors.placeholder }}>
                                        {this.props.navigation.state.params.item.about}
                                    </Text>
                                    <TouchableOpacity
                                        ref={this.props.generateTestHook('Message.Button')}
                                        style={styles.actionButton} onPress={() => { this.setState({ messageFormVisible: true }) }}>
                                        <HeadingText1 style={{ fontSize: 12, color: Colors.white }}>Message Cynthia</HeadingText1>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.reviews}>
                                    <HeadingText1 style={{ margin: 10, color: Colors.placeholder }}>R E V I E W S</HeadingText1>
                                    <TouchableOpacity style={styles.addReview} onPress={() => { this.setState({ addReviewVisible: true }) }}>
                                        <ParagraphText2 style={{ marginRight: 7, fontSize: 12, color: Colors.primary }}>w r i t e  r e v i e w</ParagraphText2>
                                        <Image source={require('../assets/icons/icons8-inspection-96.png')} style={{ height: 18, width: 18 }} />
                                    </TouchableOpacity>
                                    {displayReviews}
                                </View>
                                {viewall}
                                <View style={styles.photos}>
                                    <HeadingText1 style={{ marginBottom: 10, alignSelf: 'center', marginTop: 10, color: Colors.placeholder }}>P H O T O  G A L L E R Y</HeadingText1>
                                    <View style={styles.gallery}>
                                        {images}
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>

                {this.renderAddReview()}
                {this.renderMessageForm()}

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    headerTitle: {
        fontSize: 25,
        marginTop: 45,
        letterSpacing: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        color: Colors.primary,
    },
    outerContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    photos: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        color: Colors.placeholder,
    },
    viewAll: {
        color: Colors.primary,
        marginTop: -13,
        paddingBottom: 5,
    },
    background: {
        marginTop: -20,
        height: height / 2,
        width: width
    },
    modalItemContainer: {
        marginTop: 20,
        flex: 1,
    },
    icon: {
        width: 15,
        height: 15,
    },
    UpdatePic: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        position: 'absolute',
        padding: 10,
        height: 40,
        width: 100,
        zIndex: 1,
        backgroundColor: 'rgba(99, 99, 99, 0.6)',
    },
    ratingInput: {
        textAlign: 'center',
        width: 45,
        paddingHorizontal: 6,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        borderColor: Colors.highlight,
        borderWidth: 1,
        marginRight: 3,
        zIndex: 1,
    },
    reviewTitleInput: {
        flex: 1,
        width: width - 60,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: Colors.highlight,
        borderWidth: 1,
        marginBottom: 10,
        zIndex: 1,
    },
    reviewInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        textAlignVertical: 'top',
        width: width - 60,
        borderWidth: 1,
        borderColor: Colors.highlight,
        borderRadius: 10,
        zIndex: 1,
    },
    reviewImage: {
        width: width - 55,
        height: width - 55,
        marginHorizontal: width / 60,
        marginBottom: 15,
    },
    list: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    profileBackground: {
        height: height / 2,
        width: width
    },
    addReview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 30,
        width: width - 65,
    },
    backButton: {
        position: "absolute",
        top: 25,
        left: 10,
        margin: 10,
    },
    back: {
        position: "absolute",
        left: 12,
        top: 10,
    },
    save: {
        position: "absolute",
        right: 12,
        top: 10,
    },
    innerContainer: {
        marginTop: 40,
        marginHorizontal: 10,
        marginBottom: 40,
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
    sendButton: {
        position: "absolute",
        top: 50,
        right: 10,
        margin: 10,
    },
    actionButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
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
    resultTitle: {
        flex: 1,
        flexWrap: 'wrap',
        marginBottom: 4,
        fontSize: 20
    },
    ratingNum: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: Colors.primary,
        position: 'absolute',
        left: 10,
        top: -40,
        margin: 10,
        zIndex: 1
    },
    reviewNum: {
        flex: 1,
        flexDirection: "row",
        color: Colors.primary,
        position: 'absolute',
        right: 10,
        top: -40,
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
    tags: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tag: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        marginHorizontal: 2,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageFormContainer: {
        marginVertical: 40,
        marginHorizontal: 20
    },
    messageInput: {
        marginVertical: 5,
        borderRadius: 5,
        padding: 10,
        borderColor: Colors.highlight,
        borderWidth: 1
    },
    reviews: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 10
    },
    reviewContainer: {
        width: width - 60,
        marginHorizontal: 30,
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
    heading1: {
        fontSize: 14,
        color: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    upload: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Colors.highlight,
        paddingVertical: 5,
        paddingHorizontal: 30,
        width: width - 65,
        marginBottom: 25,
    },
    headerLeft: {
        color: Colors.primary,
        flex: 1,
        justifyContent: 'flex-start',
        zIndex: 1,
    },
    headerRight: {
        color: Colors.placeholder,
        flex: 1,
        textAlign: 'right',
        zIndex: 1,
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    gallery: {
        flexWrap: 'wrap',
        flexDirection: "row",
        alignContent: 'center',
        marginBottom: 20,
    }
});

//export default withNavigation(BusinessScreen);
const BusinessScreenSpec = hook(BusinessScreen);
export default (BusinessScreenSpec);