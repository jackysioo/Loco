import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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

MessageScreen.navigationOptions = {
    title: 'Messages',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
