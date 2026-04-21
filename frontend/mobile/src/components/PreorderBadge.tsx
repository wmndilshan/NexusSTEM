import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';

export function PreorderBadge() {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>PRE-ORDER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.primary[800],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  text: {
    color: Colors.accent[300],
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
