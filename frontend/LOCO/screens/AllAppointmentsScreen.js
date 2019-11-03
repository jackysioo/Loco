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
import { Images, user, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
const { width, height } = Dimensions.get("screen");


class AllAppointmentsScreen extends React.Component {

    render() {
        const appointments = user.appointments.map(appointment => {
            if (appointment.type === "client") {
                return (
                    <View style={styles.userContainer}>
                        <TouchableOpacity style={styles.cancelButton}>
                            <HeadingText2 style={styles.cancel}> Cancel </HeadingText2>
                            <Image style={styles.cancelIcon} source={require('../assets/icons/icons8-cancel-64.png')} />
                        </TouchableOpacity>
                        <Image source={{ uri: appointment.image }} style={styles.appointmentImg}></Image>
                        <View style={{ margin: 15 }}>
                            <View style={styles.info}>
                                <HeadingText1 style={{ color: Colors.primary }}>{appointment.fullName} </HeadingText1>
                                <ParagraphText2 style={{ color: Colors.placeholder }}>BOOKED YOU</ParagraphText2>
                            </View>
                            <View style={styles.info}>
                                <HeadingText2 style={{ color: Colors.placeholder }}>SERVICE: </HeadingText2>
                                <ParagraphText2 style={{ color: Colors.primary }}>{appointment.service}</ParagraphText2>
                            </View>
                            <View style={styles.info}>
                                <HeadingText2 style={{ color: Colors.placeholder }}>DATE: </HeadingText2>
                                <ParagraphText2
                                    style={{ color: Colors.primary }}>{appointment.date} ➔ {appointment.time}</ParagraphText2>
                            </View>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.userContainer}>
                        <TouchableOpacity style={styles.cancelButton}>
                            <HeadingText2 style={styles.cancel}> Cancel </HeadingText2>
                            <Image style={styles.cancelIcon} source={require('../assets/icons/icons8-cancel-64.png')} />
                        </TouchableOpacity>
                        <Image source={{ uri: appointment.image }} style={styles.appointmentImg}></Image>
                        <View style={{ margin: 15 }}>
                            <View style={styles.info}>
                                <ParagraphText2 style={{ color: Colors.placeholder }}>YOU BOOKED </ParagraphText2>
                                <HeadingText1 style={{ color: Colors.primary }}>{appointment.fullName}</HeadingText1>
                            </View>
                            <View style={styles.info}>
                                <HeadingText2 style={{ color: Colors.placeholder }}>SERVICE: </HeadingText2>
                                <ParagraphText2 style={{ color: Colors.primary }}>{appointment.service}</ParagraphText2>
                            </View>
                            <View style={styles.info}>
                                <HeadingText2 style={{ color: Colors.placeholder }}>DATE: </HeadingText2>
                                <ParagraphText2
                                    style={{ color: Colors.primary }}>{appointment.date} ➔ {appointment.time}</ParagraphText2>
                            </View>
                        </View>
                    </View>
                )
            }
        })

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <ImageBackground
                            source={Images.ProfileBackground}
                            style={styles.appointmentContainer}
                            imageStyle={styles.background}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={styles.itemContainer}>
                                <View style={styles.innerContainer}>
                                    <View style={styles.list}>
                                        <HeadingText1 style={{
                                            marginTop: 30,
                                            marginBottom: 10,
                                            color: Colors.placeholder,
                                        }}>A L L  Y O U R  A P P O I N T M E N T S</HeadingText1>
                                        {appointments}
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
    itemContainer: {
        flex: 1,
        marginBottom: 40,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    background: {
        marginTop: -20,
        height: height / 2,
        width: width
    },
    appointmentContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    innerContainer: {
        marginTop: 10,
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
    list: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
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
    cancelButton: {
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
    cancel: {
        shadowColor: Colors.black,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.7,
        color: '#ffc4c4'
    },
    cancelIcon: {
        width: 14,
        height: 14,
        marginTop: -1
    },
    appointmentImg: {
        width: "100%",
        height: height / 6,
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default withNavigation(AllAppointmentsScreen);