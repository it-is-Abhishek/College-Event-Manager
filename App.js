import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </UserProvider>
  );
}
