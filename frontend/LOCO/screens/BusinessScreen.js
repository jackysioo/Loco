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
    Button,
    Modal
} from 'react-native';

const { height, width } = Dimensions.get('screen');
import { Colors } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';


class BusinessScreen extends React.Component {
    render() {
        const tags = this.props.navigation.state.params.item.tags.map(tag => {
            return (
                <View style={styles.tag}>
                    <Text style={{ fontSize: 10, color: Colors.primary }}> #{tag} </Text>
                </View>
            )
        })

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={{ uri: this.props.navigation.state.params.item.images[0] }}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <HeadingText1 style={{ fontSize: 14, color: Colors.white }}>Back</HeadingText1>
                        </TouchableOpacity>
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.profileCard}>
                                <View style={styles.profilePicContainer}>
                                    <Image source={{ uri: this.props.navigation.state.params.item.profilePic }} style={styles.profilePic} />
                                </View>
                                <View style={styles.resultDescription}>
                                    <View style={styles.rating}>
                                        <HeadingText1 style={{ color: Colors.white }}> {this.props.navigation.state.params.item.rating} </HeadingText1>
                                        <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24.png')} />
                                    </View>
                                    <View style={styles.review}>
                                        <HeadingText1 style={{ color: Colors.white }}> {this.props.navigation.state.params.item.reviews.length} </HeadingText1>
                                        <Image style={styles.reviewIcon} source={require('../assets/icons/icons8-chat-24.png')} />
                                    </View>
                                    <HeadingText1 style={styles.resultTitle}> {this.props.navigation.state.params.item.title}</HeadingText1>
                                    <Text style={{ fontSize: 16 }}> {this.props.navigation.state.params.item.user}</Text>
                                    <View style={styles.tags}>
                                        <Text style={{ fontSize: 12, color: Colors.placeholder }}> {this.props.navigation.state.params.item.price} </Text>
                                        <Text style={{ fontSize: 4, color: Colors.placeholder }}> {'\u2B24'} </Text>
                                        <Text style={{ fontSize: 12, color: Colors.placeholder }}> {this.props.navigation.state.params.item.location}</Text>
                                    </View>
                                    <View style={styles.tags}>
                                        {tags}
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
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
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    profileCard: {
        padding: 65,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        width: width,
        zIndex: 5,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
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
    rating: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: Colors.white,
        position: 'absolute',
        left: 0,
        top: 0,
        margin: 10,
        zIndex: 1,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    review: {
        flex: 1,
        flexDirection: "row",
        color: Colors.white,
        position: 'absolute',
        right: 0,
        top: 0,
        margin: 10,
        zIndex: 1,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    profilePicContainer: {
        position: "relative",
        marginTop: -80,
        padding: 2,
        zIndex: 5
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 8,
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
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});

export default withNavigation(BusinessScreen);