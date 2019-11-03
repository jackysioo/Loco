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

class MapButton extends React.Component {
    state = {
        visible: this.props.visible
    }

    triggerMap = () => {
        this.setState({visible: false});
        this.props.setMapVisible(true)
    }

    renderButton() {
        return (
            <TouchableOpacity
                style={styles.openMapButtonContainer}
                onPress={this.triggerMap}>
                <Image
                    style={styles.mapButton}
                    source={require('../assets/icons/icons8-map-64.png')} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
            {this.state.visible && this.renderButton()}
            </View>
        )
    }
}
export default withNavigation(MapButton)