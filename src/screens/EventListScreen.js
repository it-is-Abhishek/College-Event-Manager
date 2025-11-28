import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventListScreen = () => {
    return (
        <View style={styles.container} accessibilityLabel="event-list-screen">
            <Text style={styles.text}>Event List Screen</Text>
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

export default EventListScreen;
