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


class ReviewScreen extends React.Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <ImageBackground
                            source={Images.ProfileBackground}
                            style={styles.reviewContainer}
                            imageStyle={styles.background}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={styles.itemContainer}>
                                <View style={styles.outerContainer}>
                                    <View style={styles.rating}>
                                        <HeadingText1 style={{ color: Colors.white }}> {this.props.navigation.state.params.rating} </HeadingText1>
                                        <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24.png')} />
                                    </View>
                                    <Image source={{ uri: this.props.navigation.state.params.image }} style={styles.reviewImage}></Image>
                                    <View style={{ margin: 15 }}>
                                        <View style={styles.review}>
                                            <HeadingText1>{this.props.navigation.state.params.title}</HeadingText1>
                                            <ParagraphText1 style={{ color: Colors.placeholder }}>{this.props.navigation.state.params.date}</ParagraphText1>
                                        </View>
                                        <ParagraphText2>{this.props.navigation.state.params.review}</ParagraphText2>
                                    </View>
                                </View>
                            </ScrollView>
                        </ImageBackground>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    reviewContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    background: {
        marginTop: -20,
        height: height / 2,
        width: width
    },
    itemContainer: {
        flex: 1,
        marginBottom: 40,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    outerContainer: {
        width: width - 60,
        marginHorizontal: width / 60,
        marginVertical: 15,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    ratingIcon: {
        width: 14,
        height: 14,
        marginTop: -1
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
    review: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});
export default withNavigation(ReviewScreen);