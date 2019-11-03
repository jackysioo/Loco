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
        modalVisible: this.props.visible,
        filters: this.props.filters
    }

    closeModal = () => {
        this.props.updateFilters(this.state.filters)
        this.setState({modalVisible: false})
        this.props.closeFilter
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
                    onPress={this.closeModal}
                    style={{position: "absolute", top:0, left:0,padding: 20}}>
                    <Text style={{fontSize: 18,color: Colors.placeholder}}>X</Text>
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
    close: {
    },
})

export default withNavigation(FilterScreen);