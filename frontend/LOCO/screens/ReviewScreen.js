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
                            style={styles.outerContainer}
                            imageStyle={styles.background}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={styles.itemContainer}>
                                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                                    <HeadingText1 style={{ color: Colors.white }}> Back </HeadingText1>
                                </TouchableOpacity>
                                <View style={styles.innerContainer}>
                                    <View style={styles.list}>
                                        <View style={styles.reviewContainer}>
                                            <View style={styles.rating}>
                                                <HeadingText1 style={{ color: Colors.white }}>
                                                    {this.props.navigation.state.params.rating}
                                                </HeadingText1>
                                                <Image style={styles.icon} source={require('../assets/icons/icons8-star-24.png')} />
                                            </View>
                                            <TouchableOpacity style={styles.edit}>
                                                <HeadingText1 style={{ color: Colors.white }}> Edit </HeadingText1>
                                                <Image style={styles.icon} source={require('../assets/icons/icons8-edit-24.png')} />
                                            </TouchableOpacity>
                                            <Image source={{ uri: this.props.navigation.state.params.image }}
                                                style={styles.reviewImage}></Image>
                                            <View style={{ margin: 15 }}>
                                                <View style={styles.review}>
                                                    <HeadingText1>{this.props.navigation.state.params.title}</HeadingText1>
                                                    <ParagraphText1 style={{ color: Colors.placeholder }}>
                                                        {this.props.navigation.state.params.date}
                                                    </ParagraphText1>
                                                </View>
                                                <ParagraphText2>{this.props.navigation.state.params.review}</ParagraphText2>
                                            </View>
                                        </View>
                                    </View>
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
    edit: {
        flex: 1,
        flexDirection: "row",
        color: Colors.white,
        position: 'absolute',
        right: 10,
        marginTop: 10,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    list: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
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
    back: {
        position: "absolute",
        left: 12,
        top: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    itemContainer: {
        flex: 1,
        marginBottom: 40,
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
        zIndex: 1
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    review: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewImage: {
        width: "100%",
        height: height / 6,
    },
    icon: {
        width: 15,
        height: 15,
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
});
export default withNavigation(ReviewScreen);