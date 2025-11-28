import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminEventListScreen = () => {
    return (
        <View style={styles.container} accessibilityLabel="admin-event-list-screen">
            <Text style={styles.text}>Admin Event List Screen</Text>
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

export default AdminEventListScreen;
