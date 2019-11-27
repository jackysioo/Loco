import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Text, View } from 'react-native';

import { Colors } from '../constants';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from './Texts';

const { height, width } = Dimensions.get('screen');

class SearchResult extends React.Component {

    render() {
        const { navigation, item } = this.props;
        const resultContainer = [styles.result, styles.shadow];
        const imgContainer = [styles.imageContainer, styles.shadow];
        const tags = item.tags.map((tag) => {
            return (
                <View key={tag} style={styles.tag}>
                    <Text style={{ fontSize: 10, color: Colors.primary }}> #{tag} </Text>
                </View>
            )
        })

        return (
            <View style={resultContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Business', {item: item})}>
                    <View style={imgContainer}>
                        <View style={styles.rating}>
                            <HeadingText1 style={{ color: Colors.white }}> {item.rating} </HeadingText1>
                            <Image style={styles.ratingIcon} source={require('../assets/icons/icons8-star-24.png')} />
                        </View>
                        <View style={styles.review}>
                            <HeadingText1 style={{ color: Colors.white }}> {item.reviews.length} </HeadingText1>
                            <Image style={styles.reviewIcon} source={require('../assets/icons/icons8-chat-24.png')} />
                        </View>
                        <Image source={{ uri: item.images[0] }} style={styles.coverImage} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Business', {item: item})}>
                    <View style={styles.resultDescription}>
                        <View style={styles.profilePicContainer}>
                            <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
                        </View>
                        <HeadingText1 style={styles.resultTitle}> {item.title}</HeadingText1>
                        <Text style={{ fontSize: 16 }}> {item.user} </Text>
                        <View style={styles.tags}>
                            <Text style={{ fontSize: 12, color: Colors.placeholder}}> {item.price} </Text>
                            <Text style={{ fontSize: 4, color: Colors.placeholder}}> {'\u2B24'} </Text>
                            <Text style={{ fontSize: 12, color: Colors.placeholder}}> {item.region}</Text>
                        </View>
                        <View style={styles.tags}>
                            {tags}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

SearchResult.propTypes = {
    item: PropTypes.object
}

const styles = StyleSheet.create({
    result: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        borderWidth: 0,
        minHeight: 180,
        width: width - 50,
    },
    resultDescription: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultTitle: {
        flex: 1,
        flexWrap: 'wrap',
        marginBottom: 4,
        fontSize: 20
    },
    rating: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: Colors.white,
        position: 'absolute',
        left: 0,
        top: 0,
        margin: 10,
        zIndex: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    review: {
        flex: 1,
        flexDirection: "row",
        color: Colors.white,
        position: 'absolute',
        right: 0,
        top: 0,
        margin: 10,
        zIndex: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.7,
    },
    imageContainer: {
        borderRadius: 3,
        elevation: 1,
        flex: 1,
        overflow: 'hidden'
    },
    coverImage: {
        height: height / 4,
        width: 'auto'
    },
    profilePicContainer: {
        position: "relative",
        marginTop: -80,
        padding: 2
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 8,
        borderColor: Colors.white
    },
    ratingIcon: {
        width: 14,
        height: 14,
        marginTop: -1
    },
    reviewIcon: {
        width: 15,
        height: 15,
        marginTop: 2
    },
    tags: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tag: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        marginHorizontal: 2,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});


export default withNavigation(SearchResult);