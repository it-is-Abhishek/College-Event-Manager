import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthScreen = () => {
    return (
        <View style={styles.container} accessibilityLabel="auth-screen">
            <Text style={styles.text}>Auth Screen</Text>
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

export default AuthScreen;
