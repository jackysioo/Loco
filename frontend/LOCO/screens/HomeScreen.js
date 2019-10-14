import React from "react";
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
    SafeAreaView
} from 'react-native';

import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { Card } from '../components';
import { Images, Colors } from "../constants";
import businesses from '../constants/businesses';
const { width } = Dimensions.get('screen');
const carouselWidth = width / 5;

class HomeScreen extends React.Component {
    state = {
        search: '',
    };
    updateSearch = search => {
        this.setState({ search });
    };

    renderCategories() {
        return Images.CategoryIcons.map(categoryIcon => {
            return (
                <View key={categoryIcon.name} style={styles.categoryItemView}>
                    <Image
                        source={categoryIcon.uri}
                        style={styles.categoryItem} />
                    <Text style={{ fontSize: 12 }}>
                        {categoryIcon.name}
                    </Text>
                </View>
            )
        });
    }
    render() {
        const { search } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <SearchBar
                            round
                            lightTheme
                            showCancel
                            containerStyle={{ backgroundColor: '#ffffff', padding: 5, margin: 10, borderWidth: 0 }}
                            inputContainerStyle={{ backgroundColor: '#ffffff' }}
                            inputStyle={{ fontSize: 13 }}
                            searchIcon={{ size: 20 }}
                            onChangeText={this.updateSearch}
                            value={search}
                            placeholder='Search for meals, tutors, beauticians on LOCO' />
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}>
                        <View style={styles.categoryContainer}>
                            {this.renderCategories()}
                        </View>
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
                                <Card item={businesses[0]} style={{ marginRight: width / 30 }} />
                                <Card item={businesses[2]} style={{ marginRight: width / 30 }} />
                                <Card item={businesses[4]} />
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
                                <Card item={businesses[3]} style={{ marginRight: width / 30 }} />
                                <Card item={businesses[4]} />
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
                                <Card item={businesses[1]} style={{ marginRight: width / 30 }} />
                                <Card item={businesses[0]} />
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
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
    contentContainer: {
        paddingTop: 5,
    },
    searchContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
    },
    categoryContainer: {
        flex: 1,
        padding: 5,
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryItemView: {
        width: carouselWidth,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryItem: {
        margin: 8,
        width: 35,
        height: 35
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
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    }
})

export default HomeScreen;