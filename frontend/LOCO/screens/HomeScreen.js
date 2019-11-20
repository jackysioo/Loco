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
import { Images, Colors, SortBy } from "../constants";
import businesses from '../constants/businesses';
import MapScreen from "./MapScreen";
import SearchResultScreen from "./SearchResultScreen";
import { Card } from '../components';
import MapButton from "../components/MapButton";
import { hook } from 'cavy'

const { width, height } = Dimensions.get('screen');

class HomeScreen extends React.Component {
    state = {
        search: '',
        location: '',
        searchLocation: {
            lat: 49.2827,
            long: -123.1207
        },
        filters: {},
        sort: SortBy.recommended,
        searchResults: [],
        isSearchActive: false,
        loadSearchResults: false,
        mapVisible: false,
        preCallMin: new Date().getMinutes(),
        preCallSec: new Date().getSeconds(),
    };

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


    calculatePerformance() {
        // Testing search performance
        var postCallMin = new Date().getMinutes(); //Current Minutes
        var postCallSec = new Date().getSeconds(); //Current Seconds
        console.log("post: " + postCallMin + ":" + postCallSec)
        console.log("pre: " + this.state.preCallMin + ":" + this.state.preCallSec)
        //add 60 if any pre call time is larger than post call times
        if (postCallMin < this.state.preCallMin) { postCallMin = postCallMin + 60 }
        if (postCallSec < this.state.preCallSec) { postCallSec = postCallSec + 60 }

        var difference = (postCallMin - this.state.preCallMin) * 60 + (postCallSec - this.state.preCallSec)
        if (difference < 0.1) {
            console.log('Test PASSED: Search results shown in under 100ms')
        } else {
            console.log('Test FAILED: Search results shown in over 100ms')
        }
    }

    search = () => {
        this.searchBar.blur();
        this.setState({
            isSearchActive: false,
            preCallMin: new Date().getMinutes(), // Current Minutes
            preCallSec: new Date().getSeconds(), //Current Seconds
            loadSearchResults: true,
            // searchResults: businesses    // TEST DATA
        })
        fetch("http://loco.eastus.cloudapp.azure.com:1337/business/get?title=" + this.state.search + "&lat=49.2827&long=-123.1207")
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isSearchActive: false,
                    loadSearchResults: true,
                    searchResults: data.businesses   
                })
            })
            .catch(error => console.log(error))

    }


    searchCategory(category) {
        this.setState({
            isSearchActive: false,
            loadSearchResults: true,
            preCallMin: new Date().getMinutes(), // Current Minutes
            preCallSec: new Date().getSeconds(), //Current Seconds
            searchResults: businesses    // TEST DATA
        })
        fetch("http://loco.eastus.cloudapp.azure.com:1337/business/get?title=" + this.state.category + "&lat=49.2827&long=-123.1207")
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isSearchActive: false,
                    loadSearchResults: true,
                    searchResults: data.Business    //REAL DATA
                })
            })
            .catch(error => console.log(error))

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
        this.searchBar.clear();
        this.searchBar.blur();
    }

    renderCategories() {
        return Images.CategoryIcons.map((categoryIcon) => {
            return (
                <TouchableOpacity
                    key={categoryIcon.name}
                    style={styles.categoryItemView}
                    onPress={() => { this.searchCategory(categoryIcon.name) }}
                    // ref={this.props.generateTestHook('Categories.Button')}
                    >
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
                    title="Cancel"
                    color="#51bfbb"
                    onPress={this.cancelSearch}
                    // ref={this.props.generateTestHook('SearchBarCancel.Button')}
                    >
                </Button>
                <Button
                    title="Search"
                    color="#51bfbb"
                    onPress={this.search}
                    // ref={this.props.generateTestHook('SearchBar.Button')}
                    >
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
                        onSubmitEditing={this.search} 
                        // ref={this.props.generateTestHook('Location.TextInput')}
                        />
                </View>
                <View style={styles.searchActiveResultsContainer}>
                    <View style={styles.searchActiveResultsContainer}>
                    </View>
                </View>
            </View>
        )
    }


    setMapVisible = (visible) => {
        this.setState({ mapVisible: visible });
    }

    mapItem = (item) => {
        const { navigation } = this.props
        this.setMapVisible(false);
        navigation.navigate('Business', { item: item })
    }

    render() {
        const { search } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    {this.state.isSearchActive && this.renderSearchCancel()}

                    <View style={styles.searchContainer}>
                        <SearchBar
                            ref={(input) => this.searchBar = input}
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
                                    source={require('../assets/icons/icons8-cancel-64.png')}/>
                            </TouchableOpacity>
                            <MapScreen item={this.mapItem} location={this.state.searchLocation} results={this.state.searchResults} />
                        </View>
                    </Modal>

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
        width: width/5,
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



const HomeScreenSpec = hook(HomeScreen);
export default withNavigationFocus(HomeScreen);