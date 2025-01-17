import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../../styles/typography';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={typography.heading}>Welcome Back!</Text>
      <Text style={typography.body}>Please log in to continue.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
