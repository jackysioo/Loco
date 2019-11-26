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
import { Colors, user, Images } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { hook } from 'cavy';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

class BioScreen extends React.Component {
    state = {
        usernameInput: user.username,
        firstNameInput: user.firstName,
        lastNameInput: user.lastName,
        addressLineInput: user.addressLine,
        addressCityInput: user.addressCity,
        addressProvinceInput: user.addressProvince,
        addressPostalCodeInput: user.addressPostalCode,
        birthdayInput: user.birthday,
        phoneInput: user.phoneNumber,
        emailInput: user.email,
        bioInput: user.bio,
        passwordInput: user.password,
    };

    submitChanges() {
        fetch("link here", {
            method: 'PUT', //POST, GET, PUT ..etc,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.usernameInput,
                firstName: this.state.firstNameInput,
                lastName: this.state.lastNameInput,
                addressLine: this.state.addressLineInput,
                addressCity: this.state.addressCityInput,
                addressProvince: this.state.addressProvinceInput,
                addressPostalCode: this.state.addressPostalCodeInput,
                phoneNumber: this.state.phoneInput,
                bio: this.state.birthdayInput,
                birthday: this.state.bioInput,
                password: this.state.passwordInput,
            })
        })
            .then(response => {
                if (response.json().ok) {
                    console.log("sucessfully updated database")
                }
            })
            .then((data) => {
                console.log(data)
            })
    }

    updatePassword = (passwordInput) => {
        this.setState({ passwordInput });
    };

    updateBio = (bioInput) => {
        this.setState({ bioInput });
    };

    updatePhone = (phoneInput) => {
        this.setState({ phoneInput });
    };

    updateEmail = (emailInput) => {
        this.setState({ emailInput });
    };

    updateUsername = (usernameInput) => {
        this.setState({ usernameInput });
    };

    updateFirstNameInput = (firstNameInput) => {
        this.setState({ firstNameInput });
    };

    updateLastNameInput = (lastNameInput) => {
        this.setState({ lastNameInput });
    };

    updateAddressLineInput = (addressLineInput) => {
        this.setState({ addressLineInput });
    };

    updateAddressCityInput = (addressCityInput) => {
        this.setState({ addressCityInput });
    };

    updateAddressProvinceInput = (addressProvinceInput) => {
        this.setState({ addressProvinceInput });
    };

    updateAddressPostalCodeInput = (addressPostalCodeInput) => {
        this.setState({ addressPostalCodeInput });
    };

    updateBirthdayInput = (birthdayInput) => {
        this.setState({ birthdayInput });
    };

    render() {
        const { usernameInput } = this.state;
        const { firstNameInput } = this.state;
        const { lastNameInput } = this.state;
        const { addressLineInput } = this.state;
        const { addressCityInput } = this.state;
        const { addressProvinceInput } = this.state;
        const { addressPostalCodeInput } = this.state;
        const { birthdayInput } = this.state;
        const { phoneInput } = this.state;
        const { emailInput } = this.state;
        const { bioInput } = this.state;
        const { passwordInput } = this.state;

        const { navigation } = this.props;

        const services = user.services.map((service) => {
            return (
                <View style={styles.userContainer} key={service.title}>
                    <View style={styles.rating}>
                        <HeadingText1 style={{
                            color: Colors.white, shadowColor: Colors.black,
                            shadowOffset: { width: -1, height: 1 },
                            shadowRadius: 1,
                            shadowOpacity: 1,
                        }}> {service.rating} </HeadingText1>
                        <Image style={[styles.icon, {
                            shadowColor: Colors.black,
                            shadowOffset: { width: -1, height: 1 },
                            shadowRadius: 1,
                            shadowOpacity: 1,
                        }]} source={require('../assets/icons/icons8-star-24.png')} />
                    </View>
                    <TouchableOpacity
                        ref={this.props.generateTestHook('EditService.Button')}
                        style={styles.edit} onPress={() => navigation.navigate('EditBusiness', {
                            title: service.title, user: service.user, about: service.about, profilePic: service.profilePic, images: service.images,
                            rating: service.rating, price: service.price, region: service.region, location: service.location, tags: service.tags
                        })}>
                        <HeadingText1 style={{
                            color: Colors.white, shadowColor: Colors.black,
                            shadowOffset: { width: -1, height: 1 },
                            shadowRadius: 1,
                            shadowOpacity: 1,
                        }}> Edit </HeadingText1>
                        <Image style={[styles.icon, {
                            shadowColor: Colors.black,
                            shadowOffset: { width: -1, height: 1 },
                            shadowRadius: 1,
                            shadowOpacity: 1,
                        }]} source={require('../assets/icons/icons8-edit-24.png')} />
                    </TouchableOpacity>
                    <Image source={{ uri: service.images[0] }} style={styles.reviewImage}></Image>
                    <View style={{ margin: 15 }}>
                        <View style={styles.review}>
                            <HeadingText1>{service.title}</HeadingText1>
                        </View>
                    </View>
                </View>
            )
        })

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: '5%' }}>
                            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}
                                ref={this.props.generateTestHook('BioBack.Button')}>
                                <HeadingText1 style={{ color: Colors.white }}> Back </HeadingText1>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.save} onPress={() => this.submitChanges()}
                                ref={this.props.generateTestHook('SaveChanges.Button')}>
                                <HeadingText1 style={{ color: Colors.white }}> Save Changes </HeadingText1>
                            </TouchableOpacity>
                            <View style={styles.profileCard}>
                                <View style={styles.profilePicContainer}>
                                    <ImageBackground source={{ uri: user.profilePic }} style={styles.profilePic}>
                                        <TouchableOpacity style={styles.UpdatePic}>
                                            <HeadingText2 style={{ color: Colors.white }}>Update </HeadingText2>
                                            <Image style={styles.icon} source={
                                                require('../assets/icons/icons8-camera-icon-with-face-24.png')} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                                <View style={styles.info}>
                                    <HeadingText1 style={{
                                        alignSelf: 'center', marginBottom: 8, color: Colors.primary
                                    }}>A B O U T</HeadingText1>
                                    <View style={{ justifyContent: 'space-between' }}>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>Username:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('Username.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateUsername}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={usernameInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>Password:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('Password.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updatePassword}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={passwordInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>First Name:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('FirstName.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateFirstNameInput}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={firstNameInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>Last Name:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('LastName.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateLastNameInput}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={lastNameInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>Address Line:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('AddressLine.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateAddressLineInput}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={addressLineInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>City:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('City.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateAddressCityInput}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={addressCityInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>Province:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('Province.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateAddressProvinceInput}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={addressProvinceInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>Postal Code:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('PostalCode.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateAddressPostalCodeInput}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={addressPostalCodeInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>Birthday:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('Birthday.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateBirthdayInput}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={birthdayInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>Phone:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('Phone.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updatePhone}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={phoneInput} />
                                        </View>
                                        <View style={styles.innerInfo}>
                                            <HeadingText1 style={{ paddingRight: 20 }}>E-mail:</HeadingText1>
                                            <TextInput
                                                ref={this.props.generateTestHook('Email.TextInput')}
                                                style={[{ height: 30, width: 250 }, styles.messageInput]}
                                                onChangeText={this.updateEmail}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={emailInput} />
                                        </View>
                                        <HeadingText1 style={{
                                            alignSelf: 'center', marginBottom: 8, color: Colors.primary, marginTop: 30
                                        }}>B I O</HeadingText1>
                                        <View style={styles.innerInfo}>
                                            <TextInput
                                                ref={this.props.generateTestHook('AboutMe.TextInput')}
                                                multiline={true}
                                                style={{
                                                    flex: 1,
                                                    paddingHorizontal: 20,
                                                    paddingTop: 20,
                                                    paddingBottom: 20,
                                                    textAlignVertical: 'top',
                                                    width: width - 65,
                                                    borderWidth: 1,
                                                    borderColor: Colors.highlight,
                                                    borderRadius: 20,
                                                    zIndex: 1,
                                                }}
                                                onChangeText={this.updateBio}
                                                inputContainerStyle={{ backgroundColor: Colors.white }}
                                                containerStyle={{ backgroundColor: '#ffffff' }}
                                                inputStyle={{ fontSize: 13 }}
                                                value={bioInput}
                                                placeholder={"Write something about yourself!"}
                                                placeholderTextColor={Colors.placeholder} />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.reviews}>
                                    <HeadingText1 style={{
                                        marginBottom: 3, color: Colors.primary
                                    }}>S E R V I C E S</HeadingText1>
                                    {services}
                                </View>
                                <TouchableOpacity
                                    ref={this.props.generateTestHook('AddService.Button')}
                                    style={styles.addService} onPress={() => navigation.navigate('AddBusiness')}>
                                    <HeadingText2 style={{ color: Colors.primary }}> Add Service </HeadingText2>
                                    <Image style={styles.icon} source={
                                        require('../assets/icons/icons8-add-new-24-aqua.png')} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    photos: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        color: Colors.placeholder,
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
        marginBottom: 25,
    },
    resultDescription: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
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
    tagInput: {
        width: width / 3 - 28,
        height: 35,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: Colors.highlight,
        borderWidth: 1,
        marginHorizontal: 5,
        marginBottom: 20,
    },
    modalItemContainer: {
        marginTop: 20,
        flex: 1,
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
    profilePicContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    icon: {
        width: 15,
        height: 15,
    },
    info: {
        flex: 1,
        flexDirection: "column",
        marginTop: 20,
        marginBottom: 50
    },
    innerInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    reviews: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 20,
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
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
    UpdatePic: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'flex-start',
        position: 'absolute',
        paddingTop: 10,
        height: 70,
        width: 140,
        top: 75,
        zIndex: 1,
        backgroundColor: 'rgba(99, 99, 99, 0.6)',
    },
    viewAll: {
        color: Colors.primary,
        marginTop: -7,
        paddingBottom: 5,
    },
    messageInput: {
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: Colors.highlight,
        borderWidth: 1
    },
    save: {
        position: "absolute",
        right: 9,
        margin: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    back: {
        position: "absolute",
        left: 9,
        margin: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    edit: {
        flex: 1,
        flexDirection: "row",
        color: Colors.white,
        position: 'absolute',
        right: 10,
        marginTop: 10,
        zIndex: 1
    },
    addService: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.primary,
        position: 'absolute',
        right: 20,
        bottom: 15,
        zIndex: 1
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

//export default withNavigationFocus(BioScreen);
const BioScreenSpec = hook(BioScreen);
export default (BioScreenSpec);
