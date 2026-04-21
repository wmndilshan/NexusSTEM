import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Layout, Shadow } from '../constants/spacing';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  editable?: boolean;
  onPress?: () => void;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search products, sensors, kits...', onFocus, editable = true, onPress }: Props) {
  if (onPress && !editable) {
    return (
      <Pressable style={[styles.container, Shadow.sm]} onPress={onPress}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={[styles.input, styles.placeholder]}>{placeholder}</Text>
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, Shadow.sm]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        onFocus={onFocus}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Layout.cardRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  icon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  placeholder: {
    color: Colors.textMuted,
  },
});
