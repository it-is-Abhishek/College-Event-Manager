import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminEventFormScreen = ({ route }) => {
    const { eventId } = route.params || {};

    return (
        <View style={styles.container} accessibilityLabel="admin-event-form-screen">
            <Text style={styles.text}>Admin Event Form Screen</Text>
            {eventId && <Text style={styles.subText}>Editing Event ID: {eventId}</Text>}
            {!eventId && <Text style={styles.subText}>Creating New Event</Text>}
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
    subText: {
        fontSize: 14,
        marginTop: 10,
        color: '#666',
    },
});

export default AdminEventFormScreen;
