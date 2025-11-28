import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyDayScreen = () => {
    return (
        <View style={styles.container} accessibilityLabel="my-day-screen">
            <Text style={styles.text}>My Day Screen</Text>
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

export default MyDayScreen;
