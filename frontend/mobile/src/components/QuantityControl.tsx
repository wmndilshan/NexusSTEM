import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface Props {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export function QuantityControl({ quantity, onDecrement, onIncrement, min = 1, max = 99, size = 'md' }: Props) {
  const btnSize = size === 'sm' ? 28 : 36;
  const fontSize = size === 'sm' ? 13 : 15;

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { width: btnSize, height: btnSize }, quantity <= min && styles.disabled]}
        onPress={onDecrement}
        disabled={quantity <= min}
        hitSlop={8}
      >
        <Text style={[styles.buttonText, { fontSize: fontSize + 2 }, quantity <= min && styles.disabledText]}>−</Text>
      </Pressable>
      <Text style={[styles.count, { fontSize, minWidth: size === 'sm' ? 24 : 32 }]}>{quantity}</Text>
      <Pressable
        style={[styles.button, { width: btnSize, height: btnSize }, quantity >= max && styles.disabled]}
        onPress={onIncrement}
        disabled={quantity >= max}
        hitSlop={8}
      >
        <Text style={[styles.buttonText, { fontSize: fontSize + 2 }, quantity >= max && styles.disabledText]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  button: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    lineHeight: 22,
  },
  disabled: {
    backgroundColor: Colors.neutral[50],
    borderColor: Colors.neutral[200],
  },
  disabledText: {
    color: Colors.textMuted,
  },
  count: {
    ...Typography.h4,
    textAlign: 'center',
    color: Colors.textPrimary,
  },
});
