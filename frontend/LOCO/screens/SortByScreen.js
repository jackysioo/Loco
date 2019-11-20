import React from 'react';
import { withNavigation } from 'react-navigation';
import {
    Dimensions,
    StyleSheet,
    Image,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    PropTypes,
    Modal
} from 'react-native';
import { SortBy, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';

const { width, height } = Dimensions.get("screen");

class SortByScreen extends React.Component {
    state = {
        modalVisible: this.props.visible,
        criteria: this.props.sort
    }

    closeModal = () => {
        this.props.updateSort(this.state.criteria)
        this.setState({ modalVisible: false })
        this.props.closeSort
    }


    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}>
                <View style={styles.modal}>
                    <TouchableOpacity
                        onPress={this.closeModal}
                        style={{ position: "absolute", top: 0, left: 0, padding: 20 }}
                        // ref={this.props.generateTestHook('CloseSort.Button')}
                        >
                        <Text style={{ fontSize: 18, color: Colors.placeholder }}>X</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginVertical: 30, marginHorizontal: 30 }}>
                        <HeadingText1 style={{ fontSize: 22, marginVertical: 30, justifyContent: "center", alignSelf: "center" }}>Sort By</HeadingText1>
                        {Object.values(SortBy).map((sort) => {
                            return (
                                <View key={sort} style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margingVertical: 15 }}>
                                    <HeadingText2 style={{ fontSize: 14, letterSpacing: 2, color: Colors.placeholder, textTransform: 'uppercase' }}>{sort}</HeadingText2>
                                    <TouchableOpacity style={styles.circle}
                                        onPress={() => this.setState({ criteria: sort })}>
                                        {this.state.criteria === sort && <View style={styles.checkedCircle} />}
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>

                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: Colors.white,
        minHeight: height * 0.4,
        marginTop: height * 0.25,
        marginHorizontal: 10,
        borderRadius: 20,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 200,
        paddingVertical: 5
    },
    circle: {
        height: 18,
        width: 18,
        borderRadius: 9,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.placeholder
    },
    checkedCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.primary
    },
})

export default withNavigation(SortByScreen);