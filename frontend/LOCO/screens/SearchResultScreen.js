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

class SearchScreen extends React.Component {
    state = {
        loadSearchResults: this.props.loadSearchResults,
        searchResults: this.props.searchResults
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

    renderSearchResultsItems() {
        return this.state.searchResults.map((result) => {
            return (
                <View key={result.title} style={styles.recommendationContainer}>
                    <SearchResult item={result} />
                </View>
            )
        });
    }

    render() {
        return (
            <View>

                {this.state.loadSearchResults && this.renderSearchResults()}
                {!this.state.loadSearchResults && this.renderRecommendations()}
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
})

export default withNavigation(SearchScreen);