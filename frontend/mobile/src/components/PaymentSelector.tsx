import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PaymentMethod } from '../types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Shadow, Layout } from '../constants/spacing';

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  badge?: string;
}

const OPTIONS: PaymentOption[] = [
  {
    id: 'payhere',
    name: 'PayHere',
    description: 'Visa, Mastercard, eZ Cash, mCash',
    icon: '💳',
    badge: 'Instant',
  },
  {
    id: 'paykoko',
    name: 'Koko / PayKoko',
    description: 'Buy now, pay in 3 equal instalments',
    icon: '🔄',
    badge: 'BNPL',
  },
  {
    id: 'bank_transfer',
    name: 'Manual Bank Transfer',
    description: 'Transfer to our bank account and upload proof',
    icon: '🏦',
  },
];

interface Props {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const isSelected = selected === option.id;
        return (
          <Pressable
            key={option.id}
            style={[styles.option, isSelected && styles.optionSelected, Shadow.sm]}
            onPress={() => onSelect(option.id)}
          >
            <View style={styles.iconWrap}>
              <Text style={styles.icon}>{option.icon}</Text>
            </View>
            <View style={styles.text}>
              <View style={styles.nameRow}>
                <Text style={[styles.name, isSelected && styles.nameSelected]}>{option.name}</Text>
                {option.badge && (
                  <View style={[styles.badge, isSelected && styles.badgeSelected]}>
                    <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>{option.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.description}>{option.description}</Text>
            </View>
            <View style={[styles.radio, isSelected && styles.radioSelected]}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Layout.cardRadius,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 14,
    gap: 12,
  },
  optionSelected: {
    borderColor: Colors.brandAccent,
    backgroundColor: Colors.accent[50],
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  nameSelected: {
    color: Colors.accent[700],
  },
  badge: {
    backgroundColor: Colors.neutral[100],
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeSelected: {
    backgroundColor: Colors.accent[200],
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  badgeTextSelected: {
    color: Colors.accent[700],
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.brandAccent,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.brandAccent,
  },
});
