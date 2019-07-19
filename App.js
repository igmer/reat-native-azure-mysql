import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GuestNavigation from './application/navigations/guest';

export default function App() {
  return (<GuestNavigation />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
