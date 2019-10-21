import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Text, View } from 'react-native';

const { height, width } = Dimensions.get('screen');
import { Colors } from '../constants';


class SearchResult extends React.Component {
  render() {
    const { navigation, item, style, ctaColor, imageStyle } = this.props;
    const imageStyles = [ styles.horizontalImage, imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer, styles.horizontalStyles, styles.shadow
    ];

    return (
      <View style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Me')}>
          <View style={imgContainer}>
            <Image source={{uri: item.image}} style={imageStyles} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Me')}>
          <View style={styles.cardDescription}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text size={10} muted={!ctaColor} color={ctaColor || Colors.primary} bold>Service by {item.user}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

SearchResult.propTypes = {
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
    elevation: 1,
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
    elevation: 2,
  },
});

export default (SearchResult);