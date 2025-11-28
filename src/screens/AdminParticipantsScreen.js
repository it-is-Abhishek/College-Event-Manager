import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminParticipantsScreen = ({ route }) => {
    const { eventId } = route.params || {};

    return (
        <View style={styles.container} accessibilityLabel="admin-participants-screen">
            <Text style={styles.text}>Admin Participants Screen</Text>
            {eventId && <Text style={styles.subText}>Event ID: {eventId}</Text>}
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

export default AdminParticipantsScreen;
