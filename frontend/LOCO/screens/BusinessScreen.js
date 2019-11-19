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
    Modal
} from 'react-native';

const { height, width } = Dimensions.get('screen');
import { Colors } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import {hook} from 'cavy'


class BusinessScreen extends React.Component {
    state = {
        messageFormVisible: false,
        subject: '',
        message: ''
    };

    sendMessage(user) {
        //send user message
    }

    updateSubject = (subject) => {
        this.setState({ subject });
    };

    updateMessage = (message) => {
        this.setState({ message });
    };

    render() {
        const { subject } = this.state;
        const { message } = this.state;

        const tags = this.props.navigation.state.params.item.tags.map((tag) => {
            return (
                <View key={tag} style={styles.tag}>
                    <Text style={{ fontSize: 10, color: Colors.primary }}> #{tag} </Text>
                </View>
            )
        })
        const reviews = this.props.navigation.state.params.item.reviews.map((review) => {
            return (
                <View key={review.title} style={styles.reviewContainer}>
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
                            ref={this.props.generateTestHook('BusinessBack.Button')}>
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
                                    <HeadingText1 style={styles.resultTitle}> {this.props.navigation.state.params.item.title}</HeadingText1>
                                    <Text style={{ fontSize: 16 }}> {this.props.navigation.state.params.item.user}</Text>
                                    <View style={styles.tags}>
                                        <Text style={{ fontSize: 12, color: Colors.placeholder }}> {this.props.navigation.state.params.item.price} </Text>
                                        <Text style={{ fontSize: 4, color: Colors.placeholder }}> {'\u2B24'} </Text>
                                        <Text style={{ fontSize: 12, color: Colors.placeholder }}> {this.props.navigation.state.params.item.region}</Text>
                                    </View>
                                    <View style={styles.tags}>
                                        {tags}
                                    </View>
                                    <Text style={{ margin: 10, marginTop: 20, fontSize: 14, color: Colors.placeholder }}>
                                        {this.props.navigation.state.params.item.about}
                                    </Text>
                                    <TouchableOpacity style={styles.actionButton} onPress={() => { this.setState({ messageFormVisible: true }) }}>
                                        <HeadingText1 style={{ fontSize: 12, color: Colors.white }}>Message {this.props.navigation.state.params.item.user}</HeadingText1>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.reviews}>
                                    <HeadingText1 style={{ margin: 10, color: Colors.placeholder }}>R E V I E W S</HeadingText1>
                                    {reviews}
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.messageFormVisible}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            this.setState({ messageFormVisible: false })
                        }}>
                        <HeadingText1 style={{ fontSize: 14, color: Colors.primary }}>Cancel</HeadingText1>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => {
                            this.sendMessage(this.props.navigation.state.params.item.user);
                        }}>
                        <HeadingText1 style={{ fontSize: 14, color: Colors.primary }}>Send</HeadingText1>
                    </TouchableOpacity>
                    <View style={styles.messageFormContainer}>
                        <TextInput
                            style={[{ height: 40 }, styles.messageInput]}
                            onChangeText={this.updateSubject}
                            inputContainerStyle={{ backgroundColor: Colors.white }}
                            containerStyle={{ backgroundColor: '#ffffff'}}
                            inputStyle={{ fontSize: 13 }}
                            value={subject}
                            placeholder="Subject"
                            placeholderTextColor={Colors.placeholder}
                        />
                        <TextInput
                            multiline
                            numberOfLines={6}
                            style={[{ height: 200 }, styles.messageInput]}
                            onChangeText={this.updateMessage}
                            inputContainerStyle={{ backgroundColor: Colors.white }}
                            containerStyle={{ backgroundColor: '#ffffff'}}
                            inputStyle={{ fontSize: 13 }}
                            value={message}
                            placeholder="Type your message here..."
                            placeholderTextColor={Colors.placeholder}
                            returnKeyType="send"
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    profileBackground: {
        height: height / 2,
        width: width
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 10,
        margin: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    sendButton: {
        position: "absolute",
        top: 20,
        right: 10,
        margin: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    actionButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
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
        marginVertical: 80,
        marginHorizontal: 20
    },
    messageInput: {
        marginVertical: 5,
        borderRadius: 5,
        padding: 10,
        borderColor: Colors.placeholder,
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
        color: Colors.primary 
    }
});

//export default withNavigation(BusinessScreen);
const BusinessScreenSpec = hook(BusinessScreen);
export default (BusinessScreenSpec);