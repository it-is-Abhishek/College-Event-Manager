import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyEventsScreen = () => {
    return (
        <View style={styles.container} accessibilityLabel="my-events-screen">
            <Text style={styles.text}>My Events Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default MyEventsScreen;
