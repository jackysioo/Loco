import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Text, View } from 'react-native';

const { height, width } = Dimensions.get('screen');
import { Colors } from '../constants';
import userController from '../controllers/UserController';


class Card extends React.Component {
  state = {
    ready: false,
    username: ''
  }

  componentWillMount() {
    userController.getUser(this.props.item.business.user)
    .then((data) => {
      this.setState({
        username: data.user.firstName
      }, () => {
        this.setState({
          ready: true
        })
      })
    })
  }

  renderReady() {
    const { navigation, item, style, ctaColor, imageStyle } = this.props;
    const imageStyles = [ styles.horizontalImage, imageStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer, styles.horizontalStyles, styles.shadow
    ];
    return(
      <View style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Business',{item: item.business, username: this.state.username})}>
          <View style={imgContainer}>
            <Image source={{uri: item.business.images[0]}} style={imageStyles} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Business',{item: item.business, username: this.state.username})}>
          <View style={styles.cardDescription}>
            <Text style={styles.cardTitle}>{item.business.title}</Text>
            <Text size={10} muted={!ctaColor} color={ctaColor || Colors.primary} bold>Service by {this.state.username}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>)

  }

  render() {
    return (
      <View>{this.state.ready && this.renderReady()}</View>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginVertical: 18,
    borderWidth: 0,
    minHeight: 140,
    width: width/1.5,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: 2,
    fontWeight: "700",
    fontSize: 14,
  },
  cardDescription: {
    flex:1,
    padding: 15
  },
  imageContainer: {
    borderRadius: 3,
    flex:1,
    overflow: 'hidden',
  },
  horizontalImage: {
    height: height/5,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
});

export default withNavigation(Card);