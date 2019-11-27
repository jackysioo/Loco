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
    TouchableWithoutFeedback,
    TouchableOpacity,
    Button,
    Modal,
    Keyboard
} from 'react-native';
import userCache from '../caches/UserCache'
import { Colors, Images } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { hook } from 'cavy';

const { height, width } = Dimensions.get('screen');
import userController from '../controllers/UserController';

class LoginScreen extends React.Component {
    state = {
        usernameInput: '',
        passwordInput: '',
        errorLogin: false
    };

    updateUsername = (usernameInput) => {
        this.setState({ usernameInput });
    };

    updatePassword = (passwordInput) => {
        this.setState({ passwordInput });
    };

    authenticateUser = async () => {
        Keyboard.dismiss()
        userController.signIn(this.state.usernameInput, this.state.passwordInput)
            .then((data) => {
                if (data !== 404) {
                    userCache.storeUserID(data.user._id)
                    userCache.storeData(data.user._id, JSON.stringify(data))
                    this.props.navigation.navigate("Main")
                } else {
                    this.setState({
                        errorLogin: true
                    })
                }
            })
    }

    signup = () => {
        this.setState({
            usernameInput: '',
            passwordInput: '',
            errorLogin: false
        })
        this.props.navigation.navigate('Signup')
    }

    render() {
        const { usernameInput } = this.state;
        const { passwordInput } = this.state;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.logincontainer}>
                        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                            <Image source={Images.Logo} style={styles.logo} />
                            <View style={styles.innerInfo}>
                                <HeadingText1 style={styles.title}>Username:</HeadingText1>
                                <TextInput
                                    ref={this.props.generateTestHook('LoginUsername.TextInput')}
                                    style={[{ height: 35, width: 250 }, styles.messageInput]}
                                    onChangeText={this.updateUsername}
                                    inputContainerStyle={{ backgroundColor: Colors.white }}
                                    containerStyle={{ backgroundColor: '#ffffff' }}
                                    value={usernameInput}                               
                                    returnKeyType="next"
                                    placeholder="username"
                                    onSubmitEditing={() => { this.password.focus(); }}
                                    blurOnSubmit={false}
                                    />
                            </View>
                            <View style={styles.innerInfo}>
                                <HeadingText1 style={[styles.title, { marginTop: -400 }]}>Password:</HeadingText1>
                                <TextInput
                                    ref={(input) =>  this.password = input
                                        // ,this.props.generateTestHook('LoginPassword.TextInput')
                                    }
                                    style={[{ height: 35, width: 250, marginTop: -400 }, styles.messageInput]}
                                    secureTextEntry={true}
                                    onChangeText={this.updatePassword}
                                    inputContainerStyle={{ backgroundColor: Colors.white }}
                                    containerStyle={{ backgroundColor: '#ffffff' }}
                                    value={passwordInput}                                  
                                    returnKeyType="go"
                                    placeholder="password"
                                    onSubmitEditing={this.authenticateUser}
                                    />
                            </View>

                            {this.state.errorLogin &&
                                <ParagraphText1 style={styles.error}>
                                    Wrong username or password. Please try again.
                                </ParagraphText1>}
                            <View>
                                <TouchableOpacity
                                    ref={this.props.generateTestHook('Login.Button')}
                                    style={styles.loginbutton} onPress={this.authenticateUser}>
                                    <HeadingText2 style={{ padding: 5, alignSelf: 'center', fontSize: 14 }}>Login</HeadingText2>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    ref={this.props.generateTestHook('SignUp.Button')}
                                    style={styles.signupbutton} onPress={this.signup}>
                                    <HeadingText2 style={{ color: Colors.white, fontSize: 12 }}>Sign Up</HeadingText2>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
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
        marginBottom: 80,
        width: 220,
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
        borderRadius: 15,
        paddingHorizontal: 15,
        // borderColor: Colors.highlight,
        // borderWidth: 1,
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
    error: {
        position: 'absolute',
        bottom: 150,
        fontSize: 12, 
        color: Colors.error, 
        marginHorizontal: 20,
        alignSelf: 'center',
    },
    loginbutton: {
        borderRadius: 16,
        backgroundColor: Colors.white,
        width: 180,
        alignSelf: 'center',
        bottom: height / 2 - 120,
    },
    signupbutton: {
        alignSelf: 'center',
        bottom: height / 2 - 140,
    },
});

const LoginScreenSpec = hook(LoginScreen);
export default (LoginScreenSpec);
