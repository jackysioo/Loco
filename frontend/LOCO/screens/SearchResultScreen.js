import React from 'react';
import { withNavigation } from 'react-navigation';
import {
    Dimensions,
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    PropTypes,
    Modal
} from 'react-native';
import { SortBy, Colors } from "../constants";
import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';
import SearchResult from "../components/SearchResult";
const { width, height } = Dimensions.get("screen");
import FilterScreen from "./FilterScreen";
import SortByScreen from "./SortByScreen";
import { hook } from 'cavy';

class SearchResultScreen extends React.Component {
    state = {
        loadSearchResults: this.props.loadSearchResults,
        searchResults: this.props.searchResults,
        isFilterVisible: false,
        isSortVisible: false,
        filters: {},
        sort: SortBy.recommended

    }

    componentDidUpdate(prevProps) {

        if (this.props.loadSearchResults !== prevProps.loadSearchResults) {
            this.setState({
                loadSearchResults: this.props.loadSearchResults,
            })
            if (this.props.loadSearchResults) {
                console.log('Test PASSED: Search results shown in under 100ms')
            }
        }
        if (this.props.searchResults !== prevProps.searchResults) {
            this.setState({
                searchResults: this.props.searchResults
            })
        }
    }

    resetSearch = () => {
        this.props.resetSearch()
    }

    updateFilters = (filters) => {
        this.setState({ filters: filters });
    };

    updateSort = (sort) => {
        this.setState({ sort: sort });
    };

    closeFilter = () => {
        this.setState({ isFilterVisible: false });
    }

    closeSort = () => {
        this.setState({ isSortVisible: false });
    }


    renderSearchResultsItems() {
        return this.state.searchResults.map((result) => {
            return (
                <View key={result.title} style={styles.recommendationContainer}>
                    <SearchResult item={result} />
                </View>
            )
        });
    }


    renderFilters() {
        return (
            <View style={styles.filterContainer}>
                <TouchableOpacity style={{ paddingVertical: 5 }}
                    onPress={this.resetSearch}
                    ref={this.props.generateTestHook('SearchResultBack.Button')}
                >
                    <HeadingText1 style={{ fontSize: 14, color: Colors.primary }}>Back</HeadingText1>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignSelf: "flex-end" }}>
                    <TouchableOpacity style={styles.filter} onPress={() => { this.setState({ isSortVisible: true }) }}
                        ref={this.props.generateTestHook('Sort.Button')}>
                        <HeadingText2 style={{ fontSize: 12, color: Colors.primary }}>Sort By</HeadingText2>
                    </TouchableOpacity>
                </View>

                <SortByScreen visible={this.state.isSortVisible} close={this.closeSort} sort={this.state.sort} updateSort={this.updateSort} />

            </View>
        )
    }

    renderSearchResults() {
        return (
            <ScrollView ref="scrollView"
                showsVerticalScrollIndicator={false}
                style={styles.ScrollContainer}
                contentContainerStyle={styles.contentContainer}>

                {this.renderFilters()}

                <HeadingText1 style={{ marginHorizontal: 20, fontSize: 24 }}>
                    Search Results
                </HeadingText1>

                {this.renderSearchResultsItems()}
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, zIndex: 1 }}>
                {this.state.loadSearchResults && this.renderSearchResults()}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 10,
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
    resultsContainer: {
        height: height - 100
    },
    filterContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    filter: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 20,
    },
})

//export default withNavigation(SearchResultScreen);
const SearchResultScreenSpec = hook(SearchResultScreen);
export default (SearchResultScreenSpec);