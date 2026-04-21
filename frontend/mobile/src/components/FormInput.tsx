import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Layout } from '../constants/spacing';

interface Props extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export function FormInput({ label, error, required, style, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={Colors.textMuted}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    ...Typography.label,
    color: Colors.textSecondary,
    textTransform: 'none',
    fontSize: 12,
    fontWeight: '600',
  },
  required: {
    color: Colors.error[500],
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.inputRadius,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  inputError: {
    borderColor: Colors.error[500],
  },
  error: {
    ...Typography.caption,
    color: Colors.error[500],
  },
});
