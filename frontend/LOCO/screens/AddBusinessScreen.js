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
import { Colors, Images, businesses, user } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { hook } from 'cavy'


class AddBusinessScreen extends React.Component {
    state = {
        businessTitleInput: '',
        aboutInput: ''
    };

    updateBusinessTitle = (businessTitleInput) => {
        this.setState({ businessTitleInput });
    };

    updateAbout = (aboutInput) => {
        this.setState({ aboutInput });
    };

    render() {

        const { aboutInput } = this.state;
        const { businessTitleInput } = this.state;

        return (
            <KeyboardAwareScrollView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={{ uri: businesses[0].images[0] }}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                                <HeadingText1 style={styles.heading1}>Back</HeadingText1>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={() => this.props.navigation.goBack()}>
                                <HeadingText1 style={styles.heading1}>Save</HeadingText1>
                            </TouchableOpacity>
                            <View style={styles.profileCard}>
                                <View style={styles.profilePicContainer}>
                                    <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
                                </View>
                                <View style={styles.resultDescription}>
                                    <TextInput
                                        style={styles.titleInput}
                                        onChangeText={this.updateBusinessTitle}
                                        inputContainerStyle={{ backgroundColor: Colors.white }}
                                        containerStyle={{ backgroundColor: '#ffffff' }}
                                        inputStyle={{ fontSize: 13 }}
                                        value={businessTitleInput}
                                        placeholder={"Service Title"}
                                        placeholderTextColor={Colors.placeholder} />
                                    <TextInput
                                        multiline={true}
                                        style={styles.aboutInput}
                                        onChangeText={this.updateAbout}
                                        inputContainerStyle={{ backgroundColor: Colors.white }}
                                        containerStyle={{ backgroundColor: '#ffffff' }}
                                        inputStyle={{ fontSize: 13 }}
                                        value={aboutInput}
                                        placeholder={"Write about your service!"}
                                        placeholderTextColor={Colors.placeholder} />
                                    <View style={styles.photos}>
                                        <HeadingText1 style={{ marginBottom: 10, alignSelf: 'center' }}>P H O T O S</HeadingText1>
                                        <TouchableOpacity style={styles.upload}>
                                            <ParagraphText2 style={{ marginRight: 7, fontSize: 12, color: Colors.highlight }}>u p l o a d</ParagraphText2>
                                            <Image source={require('../assets/icons/icons8-add-image-96.png')} style={{ height: 18, width: 18 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </KeyboardAwareScrollView>
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
    saveButton: {
        position: "absolute",
        top: 20,
        right: 10,
        margin: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
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
    heading1: {
        fontSize: 14,
        color: Colors.white
    },
    titleInput: {
        width: width - 65,
        height: 35,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: Colors.highlight,
        borderWidth: 1,
        marginBottom: 20,
    },
    aboutInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        textAlignVertical: 'top',
        width: width - 65,
        borderWidth: 1,
        borderColor: Colors.highlight,
        borderRadius: 10,
        zIndex: 1,
        marginBottom: 30,
    },
    photos: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        color: Colors.placeholder,
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
    }
});

//export default withNavigation(BusinessScreen);
const AddBusinessScreenSpec = hook(AddBusinessScreen);
export default (AddBusinessScreenSpec);