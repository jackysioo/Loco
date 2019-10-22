import React from "react";
import { withNavigationFocus } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SearchBar } from 'react-native-elements';
import {
    InteractionManager,
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
    Button,
    Modal
} from 'react-native';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { Card } from '../components';
import { Images, Colors } from "../constants";
import businesses from '../constants/businesses';
import MapScreen from "./MapScreen";
import SearchResult from "../components/SearchResult";

const { width, height } = Dimensions.get('screen');
const carouselWidth = width / 5;

class HomeScreen extends React.Component {
    state = {
        search: '',
        location: '',
        searchResults: [],
        isSearchActive: false,
        loadSearchResults: false,
        mapVisible: false
    };

    updateSearch = search => {
        this.setState({ search });
    };

    updateLocation = location => {
        this.setState({ location });
    };

    cancelSearch = () => {
        this.setState({ isSearchActive: false });
        this.searchBar.clear();
        this.searchBar.blur();
    }

    triggerSearch = () => {
        this.setState({ isSearchActive: true });
    }

    search = () => {
        this.setState({
            isSearchActive: false,
            loadSearchResults: true,
            searchResults: [...businesses]
        });
        this.renderSearchResults();
        this.searchBar.blur();

        //sendSearchReults to backend:  search + location
        //getSearchResults
    }

    setMapVisible(visible) {
        this.setState({ mapVisible: visible });
    }

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

    renderRecommendations() {
        return (
            <ScrollView ref="scrollView"
                showsVerticalScrollIndicator={false}
                style={styles.ScrollContainer}
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
        )
    }

    renderSearchCancel() {
        return (
            <View
                style={styles.searchCancelContainer}>
                <Button
                    title="Cancel"
                    color="#51bfbb"
                    onPress={this.cancelSearch}>
                </Button>
                <Button
                    title="Search"
                    color="#51bfbb"
                    onPress={this.search}>
                </Button>
            </View>
        )
    }

    renderSearchActive() {
        const { location } = this.state;
        return (
            <View
                style={styles.searchActiveContainer}>
                <View style={styles.searchContainer}>
                    <SearchBar
                        round
                        lightTheme
                        placeholder='Current location'
                        placeholderTextColor='#cccccc'
                        returnKeyType="search"
                        containerStyle={{ backgroundColor: '#ffffff', padding: 2, margin: 10, borderWidth: 0 }}
                        inputContainerStyle={{ backgroundColor: '#ffffff' }}
                        inputStyle={{ fontSize: 13 }}
                        searchIcon={{ size: 20 }}

                        onChangeText={this.updateLocation}
                        value={location}
                        onSubmitEditing={this.search} />
                </View>
                <View style={styles.searchActiveResultsContainer}>
                    <View style={styles.searchActiveResultsContainer}>
                    </View>
                </View>
            </View>
        )
    }


    renderSearchResults() {
        return (
                <ScrollView ref="scrollView"
                    showsVerticalScrollIndicator={false}
                    style={styles.ScrollContainer}
                    contentContainerStyle={styles.contentContainer}>
                    <HeadingText1 style={{ marginHorizontal: 20, fontSize: 24 }}>
                        Search Results
                    </HeadingText1>
                    {this.renderSearchResultsItems()}
                </ScrollView>
        )
    }

    renderSearchResultsItems() {
        return businesses.map(result => {
            return (
                <View style={styles.recommendationContainer}>
                    <SearchResult item={result} />
                </View>
            )
        });
    }

    renderMapButton() {
        return (
                <TouchableOpacity
                    style={styles.openMapButtonContainer}
                    onPress={() => {
                        this.setMapVisible(true);
                    }}>
                    <Image
                        style={styles.mapButton}
                        source={require('../assets/icons/icons8-map-64.png')}/>
                </TouchableOpacity>
        )
    }

    renderMapView() {
        return(
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.mapVisible}>
                    <View>
                        <TouchableOpacity
                            style={styles.closeMapButtonContainer}
                            onPress={() => {
                                this.setMapVisible(!this.state.mapVisible);
                            }}>
                            <Image
                                style={styles.mapButton}
                                source={require('../assets/icons/icons8-cancel-64.png')}
                            />
                        </TouchableOpacity>
                        <MapScreen />
                    </View>
                </Modal>
        )
    }

    render() {
        const { search } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    {this.state.isSearchActive && this.renderSearchCancel()}

                    <View style={styles.searchContainer}>
                        <SearchBar
                            ref={input => this.searchBar = input}
                            round
                            lightTheme
                            containerStyle={{ backgroundColor: '#ffffff', padding: 2, margin: 10, borderWidth: 0 }}
                            inputContainerStyle={{ backgroundColor: '#ffffff' }}
                            inputStyle={{ fontSize: 13 }}
                            searchIcon={{ size: 20 }}
                            returnKeyType="search"
                            placeholder='Search for meals, tutors, beauticians on LOCO'
                            placeholderTextColor='#cccccc'

                            onChangeText={this.updateSearch}
                            value={search}
                            onFocus={this.triggerSearch}
                            onSubmitEditing={this.search} />
                    </View>

                    {this.state.isSearchActive && this.renderSearchActive()}
                    {!this.state.loadSearchResults && this.renderRecommendations()}
                    {this.state.loadSearchResults && this.renderSearchResults()}
                    {this.state.loadSearchResults && this.renderMapButton()}
                    {this.state.mapVisible && this.renderMapView()}

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
        paddingVertical: 20,
    },
    searchContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        zIndex: 10,
    },
    searchCancelContainer: {
        flexDirection: 'row',
        zIndex: 10,
        justifyContent: 'space-between',
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    searchActiveContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        zIndex: 5,
        width: width,
        position: 'absolute',
        left: 0,
        top: 95,
    },
    searchActiveResultsContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        height: height,
    },
    scrollContainer: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        zIndex: 0
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
    resultsContainer: {
        height: height - 100
    },
    mapButton: {
        width: 35,
        height: 35
    },
    closeMapButtonContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        margin: 20,
        padding: 0,
        borderRadius: 40,
        zIndex: 10,
        backgroundColor: Colors.white,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
    },
    openMapButtonContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 20,
        padding: 10,
        borderRadius: 40,
        zIndex: 10,
        backgroundColor: Colors.white,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
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




export default withNavigationFocus(HomeScreen);