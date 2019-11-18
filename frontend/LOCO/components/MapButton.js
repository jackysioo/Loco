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
import {hook} from 'cavy'

const { width, height } = Dimensions.get("screen");

class MapButton extends React.Component {
    
    state = {
        visible: this.props.visible
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible !== prevProps.visible) {
            this.setState({ visible: this.props.visible });
        }
      }

    triggerMap = () => {
        this.props.setMapVisible(true)
    }

    renderButton() {
        return (
            <TouchableOpacity
                style={styles.mapButton}
                onPress={this.triggerMap}
                ref={this.props.generateTestHook('MapOpen.Button')}>
                <Image
                    style={styles.mapButtonImg}
                    source={require('../assets/icons/icons8-map-64.png')} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.openMapButtonContainer}>
                {this.state.visible && this.renderButton()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    openMapButtonContainer:{
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: 20,
            zIndex: 10
    },
    mapButton: {
        padding: 10,
        borderRadius: 40,
        zIndex: 10,
        backgroundColor: Colors.white,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    mapButtonImg: {
        width: 35,
        height: 35
    }
})

export default withNavigation(MapButton)