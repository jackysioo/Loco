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
import { Images, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';

const { width, height } = Dimensions.get("screen");

class FilterScreen extends React.Component {
    state = {
        modalVisible: true,
        filters: {}
    }

    closeModal = () => {
        this.props.filters(this.state.filters)
        this.setState({modalVisible: false})
        this.props.visible(false)
    }

    render() {
        const { filters } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}>
                <View 
                style={styles.modal}>
                    <TouchableOpacity
                        style={styles.closeMapButtonContainer}
                        onPress={this.closeModal}>
                        <Image
                            style={styles.mapButton}
                            source={require('../assets/icons/icons8-cancel-64.png')} />
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}



const styles = StyleSheet.create({
    modal: {
        backgroundColor: Colors.white,
        height: height,
        marginTop: 50,
        marginHorizontal: 10,
        borderRadius: 20,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 300,
    },
    mapButton: {
        margin: 10,
        width: 35,
        height: 35
    }
})

export default withNavigation(FilterScreen);