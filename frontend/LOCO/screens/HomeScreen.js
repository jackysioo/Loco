import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { ParagraphText1, ParagraphText2, HeadingText1, HeadingText2, HeadingText3 } from '../components/Texts';

export default function HomeScreen() {
    const [search, setSearch] = useState(
        ''
      );
    const handleSearchChange = event => setSearch(event.target.value);
    const clearSearch = event => setSearch('');

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    onChangeText={handleSearchChange}
                    onClear={clearSearch}
                    // onChangeText={text => this.SearchFilterFunction(text)}
                    // onClear={text => this.SearchFilterFunction('')}
                    value={search}
                    placeholder='Search for meals, tutors, beauticians on LOCO' />

            </View>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
            </ScrollView>

            <View style={styles.tabBarInfoContainer}>
                <Text style={styles.tabBarInfoText}>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 20,
    },
    searchContainer: {
        padding: 5,
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