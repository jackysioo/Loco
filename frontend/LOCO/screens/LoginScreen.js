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
    TextInput,
    View,
    ImageBackground,
    TouchableOpacity,
    Button,
    Modal
} from 'react-native';

const { height, width } = Dimensions.get('screen');
import { Colors, Images } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { hook } from 'cavy';

class LoginScreen extends React.Component {
    state = {
        usernameInput: '',
        passwordInput: '',
    };

    updateUsername = (usernameInput) => {
        this.setState({ usernameInput });
    };

    updatePassword = (passwordInput) => {
        this.setState({ passwordInput });
    };

    render() {
        const { usernameInput } = this.state;
        const { passwordInput } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.logincontainer}>
                        <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                            <Image source={Images.Logo} style={styles.logo} />
                            <View style={styles.innerInfo}>
                                <HeadingText1 style={styles.title}>Username:</HeadingText1>
                                <TextInput
                                    //ref={this.props.generateTestHook('Birthday.TextInput')}
                                    style={[{ height: 30, width: 250 }, styles.messageInput]}
                                    onChangeText={this.updateUsername}
                                    inputContainerStyle={{ backgroundColor: Colors.white }}
                                    containerStyle={{ backgroundColor: '#ffffff' }}
                                    value={usernameInput} />
                            </View>
                            <View style={styles.innerInfo}>
                                <HeadingText1 style={[styles.title, { marginTop: -400 }]}>Password:</HeadingText1>
                                <TextInput
                                    //ref={this.props.generateTestHook('Birthday.TextInput')}
                                    style={[{ height: 30, width: 250, marginTop: -400 }, styles.messageInput]}
                                    onChangeText={this.updatePassword}
                                    inputContainerStyle={{ backgroundColor: Colors.white }}
                                    containerStyle={{ backgroundColor: '#ffffff' }}
                                    value={passwordInput} />
                            </View>
                            <TouchableOpacity style={styles.loginbutton}>
                                <HeadingText2 style={{ padding: 5, alignSelf: 'center' }}>Login</HeadingText2>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.signupbutton} onPress={() => navigation.navigate('Signup')}>
                                <HeadingText2 style={{ color: Colors.white }}>Sign Up</HeadingText2>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    logincontainer: {
        flex: 1,
    },
    logo: {
        alignSelf: 'center',
        marginBottom: 50,
        width: 175,
        resizeMode: 'contain',
        top: height / 2 - 220,

    },
    innerInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    messageInput: {
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: Colors.highlight,
        borderWidth: 1,
        backgroundColor: Colors.white,
    },
    info: {
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 30,
    },
    title: {
        color: Colors.white,
        paddingRight: 20,
    },
    loginbutton: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.highlight,
        backgroundColor: Colors.white,
        width: 60,
        alignSelf: 'center',
        bottom: height / 2 - 85,
    },
    signupbutton: {
        alignSelf: 'center',
        bottom: height / 2 - 100,
    },
});

//export default withNavigationFocus(BioScreen);
const LoginScreenSpec = hook(LoginScreen);
export default (LoginScreenSpec);