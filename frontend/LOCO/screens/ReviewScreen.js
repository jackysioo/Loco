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
                                <TouchableOpacity style={styles.edit}>
                                    <HeadingText1 style={{ color: Colors.white }}> Edit </HeadingText1>
                                    <Image style={styles.icon} source={require('../assets/icons/icons8-edit-24.png')} />
                                </TouchableOpacity>
                                <View style={styles.innerContainer}>
                                    <View style={styles.list}>
                                        <Image source={{ uri: this.props.navigation.state.params.image }}
                                            style={styles.reviewImage}>
                                        </Image>
                                        <View style={styles.review}>
                                            <HeadingText1>❝  {this.props.navigation.state.params.title}</HeadingText1>
                                            <HeadingText2 style={{ marginTop: 4 }}>{this.props.navigation.state.params.review}  ❞</HeadingText2>
                                        </View>
                                        <View style={{ marginTop: 20, flexDirection: 'row' }}>
                                            <HeadingText1 style={styles.headerLeft}>R e v i e w   b y</HeadingText1>
                                            <HeadingText2 style={styles.headerRight}> {this.props.navigation.state.params.user} </HeadingText2>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <HeadingText1 style={styles.headerLeft}>S e r v i c e   b y</HeadingText1>
                                            <HeadingText2 style={styles.headerRight}> {this.props.navigation.state.params.business} </HeadingText2>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <HeadingText1 style={styles.headerLeft}>D a t e</HeadingText1>
                                            <HeadingText2 style={styles.headerRight}> {this.props.navigation.state.params.date} </HeadingText2>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <HeadingText1 style={styles.headerLeft}>R a t i n g</HeadingText1>
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <View style={styles.rating}>
                                                    <HeadingText2 style={{ color: Colors.placeholder, marginRight: 3 }}>
                                                        {this.props.navigation.state.params.rating}
                                                    </HeadingText2>
                                                    <Image style={styles.icon} source={require('../assets/icons/icons8-star-24-grey.png')} />
                                                </View>
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
        margin: 20,
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
        width: width - 70,
        flex: 1,
        flexDirection: 'column',
        marginVertical: 5,
    },
    reviewImage: {
        width: width - 55,
        height: width - 55,
        marginHorizontal: width / 60,
        marginBottom: 15,
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
        color: Colors.placeholder,
        zIndex: 1,
    },
});
export default withNavigation(ReviewScreen);