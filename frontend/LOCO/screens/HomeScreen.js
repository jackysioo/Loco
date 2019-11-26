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
    TouchableWithoutFeedback,
    Button,
    Modal,
    ActivityIndicator
} from 'react-native';
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2 } from '../components/Texts';
import { Images, Colors, SortBy } from "../constants";
import businesses from '../constants/businesses';
import MapScreen from "./MapScreen";
import SearchResultScreen from "./SearchResultScreen";
import { Card } from '../components';
import MapButton from "../components/MapButton";
import { hook, useCavy, wrap } from 'cavy'
import mapController from "../controllers/MapController";
import searchController from "../controllers/SearchController";
import UserController from '../controllers/UserController';
import userCache from '../caches/UserCache'

const { width, height } = Dimensions.get('screen');
const userController = new UserController()


class HomeScreen extends React.Component {
    state = {
        search: '',
        location: '',
        searchLocation: {},
        filters: {},
        sort: SortBy.recommended,
        searchResults: [],
        isSearchActive: false,
        loadSearchResults: false,
        mapVisible: false,
        preCallMin: new Date().getMinutes(),
        preCallSec: new Date().getSeconds(),
        ready : false
    };


    constructor(props) {
        super(props)
        this.suggestions = null
    }

    componentWillMount() {
        userCache.getUserID()
            .then((id) => {
                userController.getSuggestions(id)
                    .then((data) => {
                        this.suggestions = data.suggestions
                        this.setState({
                            ready: true
                        })
                    })
            })
    }

    // calculatePerformance() {
    //     // Testing search performance
    //     var postCallMin = new Date().getMinutes(); //Current Minutes
    //     var postCallSec = new Date().getSeconds(); //Current Seconds
    //     console.log("post: " + postCallMin + ":" + postCallSec)
    //     console.log("pre: " + this.state.preCallMin + ":" + this.state.preCallSec)
    //     //add 60 if any pre call time is larger than post call times
    //     if (postCallMin < this.state.preCallMin) { postCallMin = postCallMin + 60 }
    //     if (postCallSec < this.state.preCallSec) { postCallSec = postCallSec + 60 }

    //     var difference = (postCallMin - this.state.preCallMin) * 60 + (postCallSec - this.state.preCallSec)
    //     if (difference < 0.1) {
    //         console.log('Test PASSED: Search results shown in under 100ms')
    //     } else {
    //         console.log('Test FAILED: Search results shown in over 100ms')
    //     }
    // }


    updateSearch = (search) => {
        this.setState({ search });
    };

    updateLocation = (location) => {
        this.setState({ location });
    };

    cancelSearch = () => {
        this.setState({
            mapVisible: false,
            isSearchActive: false,
        });
        this.searchBar.blur();
    }

    triggerSearch = () => {
        this.setState({ isSearchActive: true });
    }

    resetSearch = () => {
        this.setState({
            search: '',
            location: '',
            searchLocation: {},
            filters: {},
            sort: SortBy.recommended,
            searchResults: [],
            isSearchActive: false,
            loadSearchResults: false,
            mapVisible: false,
        });
        // this.searchBar.clear();
        // this.searchBar.blur();
    }

    setMapVisible = (visible) => {
        this.setState({ mapVisible: visible });
    }

    mapItem = (item) => {
        const { navigation } = this.props
        this.setMapVisible(false);
        navigation.navigate('Business', { item: item })
    }


    //submit search query
    //first get lat and long from geocode
    //then send search input and geocode to searchcontroller to fetch data
    submitSearch = () => {
        mapController.geocodeFromCity(this.state.location)
            .then((geocode) => {
                this.setState({
                    searchLocation: {
                        lat: geocode.lat,
                        long: geocode.long
                    }
                }, () => {
                    this.setState({
                        isSearchActive: false
                    })
                })

                //calls search api
                searchController.search(this.state.search, geocode)
                    .then((businesses) => {
                        this.setState({
                            searchResults: businesses
                        }, () => {
                            console.log(businesses)
                            this.setState({
                                loadSearchResults: true
                            })
                        })
                    })
                this.searchBar.blur();
            });
    }


    //submit search query for category
    //default location: vancouver
    //send category as search input to searchcontroller to fetch data
    submitSearchCategory = (category) => {
        this.setState({
            isSearchActive: false,
        })

        //calls search api (with default location in Vancouver)
        searchController.search(category, { lat: 49.2827, long: -123.1207 })
            .then((businesses) => {
                this.setState({
                    searchResults: businesses
                }, () => {
                    console.log(businesses)
                    this.setState({
                        loadSearchResults: true
                    })
                })
            })

    }


    renderCategories() {
        var count = 0; // for testing purposes
        return Images.CategoryIcons.map((categoryIcon) => {
            count++;
            return (
                <TouchableOpacity
                    ref={this.props.generateTestHook('Categories.Button' + count)}
                    key={categoryIcon.name}
                    style={styles.categoryItemView}
                    onPress={() => this.submitSearchCategory(categoryIcon.name)}>
                    <Image
                        source={categoryIcon.uri}
                        style={styles.categoryItem} />
                    <Text style={{ fontSize: 12 }}>
                        {categoryIcon.name}
                    </Text>
                </TouchableOpacity>
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
                    ref={this.props.generateTestHook('SearchBarCancel.Button')}
                    title="Cancel"
                    color="#51bfbb"
                    onPress={this.cancelSearch}>
                </Button>
                <Button
                    ref={this.props.generateTestHook('SearchBar.Button')}
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
                        onSubmitEditing={this.submitSearch}
                        ref={this.props.generateTestHook('Location.TextInput')} />
                </View>
                <View style={styles.searchActiveResultsContainer}>
                    <View style={styles.searchActiveResultsContainer}>
                    </View>
                </View>
            </View>
        )
    }


    renderLoading() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#51bfbb" />
            </View>
        )
    }

    renderReady() {
        const { search } = this.state;

        return (
                <View style={styles.container}>

                    {this.state.isSearchActive && this.renderSearchCancel()}

                    <View style={styles.searchContainer}>
                        <TouchableWithoutFeedback
                            ref={this.props.generateTestHook('Search.Button')}
                            onPress={this.triggerSearch}>
                            <SearchBar
                                ref={(input) => this.searchBar = input, this.props.generateTestHook('Search.TextInput')}
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
                        </TouchableWithoutFeedback>
                    </View>

                    {this.state.isSearchActive && this.renderSearchActive()}

                    <MapButton visible={this.state.loadSearchResults} setMapVisible={this.setMapVisible} />
                    {!this.state.loadSearchResults && this.renderRecommendations()}
                    <SearchResultScreen
                        resetSearch={this.resetSearch}
                        loadSearchResults={this.state.loadSearchResults}
                        searchResults={this.state.searchResults}
                        preCallMin={this.state.preCallMin}
                        preCallSec={this.state.preCallSec}
                    />


                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.mapVisible}>
                        <View>
                            <TouchableOpacity
                                style={styles.closeMapButtonContainer}
                                onPress={() => {
                                    this.setMapVisible(!this.state.mapVisible);
                                }}
                            // ref={this.props.generateTestHook('MapClose.Button')}
                            >
                                <Image
                                    style={styles.mapButton}
                                    source={require('../assets/icons/icons8-cancel-64.png')} />
                            </TouchableOpacity>
                            <MapScreen item={this.mapItem} location={this.state.searchLocation} results={this.state.searchResults} />
                        </View>
                    </Modal>

                </View>
        ); 
    }

    render(){
        return(
            <SafeAreaView style={{ flex: 1 }}>
                {!this.state.ready && this.renderLoading()}
            {this.state.ready && this.renderReady()}
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },
    loading: {
        position: "absolute",
        top: height / 2,
        left: width / 2,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
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
    mapButton: {
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
        width: width / 5,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryItem: {
        margin: 8,
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




//export default withNavigationFocus(HomeScreen);
const HomeScreenSpec = hook(HomeScreen);
export default (HomeScreenSpec);
