import React from 'react';import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function MessageScreen() {
    return (<View style={styles.container}>
        <View style={styles.searchContainer}>

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
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
