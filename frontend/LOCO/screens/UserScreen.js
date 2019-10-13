import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function UserScreen() {
    return (
        <View style={styles.container}>
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

UserScreen.navigationOptions = {
    title: 'Me',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
