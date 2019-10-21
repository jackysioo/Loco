import React from "react";
import { withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SearchBar } from 'react-native-elements';
import {
    Dimensions,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Button
} from 'react-native';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { SearchResult } from '../components';
import { Images, Colors } from "../constants";
import businesses from '../constants/businesses';

const { width, height } = Dimensions.get('screen');

class SearchResultsScreen extends React.Component {
    render() {
        const { items } = this.props;
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.ScrollContainer}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.recommendationContainer}>
                    <HeadingText1 style={{ marginLeft: 10, fontSize: 20 }}>
                        Discover Near You
                                </HeadingText1>
                    <ScrollView horizontal={true}
                        decelerationRate={0}
                        snapToInterval={300}
                        snapToAlignment={"center"}
                        showsHorizontalScrollIndicator={false}
                        style={styles.itemContainer}>
                        <SearchResult item={businesses[0]} style={{ marginRight: width / 30 }} />
                        <SearchResult item={businesses[2]} style={{ marginRight: width / 30 }} />
                        <SearchResult item={businesses[4]} />
                    </ScrollView>
                </View>
                <View style={styles.recommendationContainer}>
                    <HeadingText1 style={{ marginLeft: 10, fontSize: 20 }}>
                        We Think You Will Like
                                </HeadingText1>
                    <ScrollView horizontal={true}
                        decelerationRate={0}
                        snapToInterval={300}
                        snapToAlignment={"center"}
                        showsHorizontalScrollIndicator={false}
                        style={styles.itemContainer}>
                        <SearchResult item={businesses[3]} style={{ marginRight: width / 30 }} />
                        <SearchResult item={businesses[4]} />
                    </ScrollView>
                </View>
                <View style={styles.recommendationContainer}>
                    <HeadingText1 style={{ marginLeft: 10, fontSize: 20 }}>
                        Popular on LOCO
                                </HeadingText1>
                    <ScrollView horizontal={true}
                        decelerationRate={0}
                        snapToInterval={300}
                        snapToAlignment={"center"}
                        showsHorizontalScrollIndicator={false}
                        style={styles.itemContainer}>
                        <SearchResult item={businesses[1]} style={{ marginRight: width / 30 }} />
                        <SearchResult item={businesses[0]} />
                    </ScrollView>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },
    scrollContainer: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        zIndex: 0
    },
    recommendationContainer: {
        flex: 1,
        margin: 10
    },
    itemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 10,
        flexDirection: 'row',
    }
})


export default (SearchResultsScreen);