import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Icon Test</Text>
      
      <View style={styles.iconRow}>
        <Text>Direct Ionicons:</Text>
        <Ionicons name="person" size={24} color="blue" />
        <Ionicons name="mail" size={24} color="green" />
        <Ionicons name="call" size={24} color="red" />
      </View>
      
      <View style={styles.iconRow}>
        <Text>Popular icons:</Text>
        <Ionicons name="home" size={24} color="purple" />
        <Ionicons name="heart" size={24} color="red" />
        <Ionicons name="star" size={24} color="gold" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
});