import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DummyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a dummy component for visibility purposes only.</Text>
      <Text style={styles.subText}>It is not used in the app.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DummyComponent;